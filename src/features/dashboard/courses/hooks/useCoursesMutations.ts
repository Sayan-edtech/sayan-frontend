import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  coursesApi,
  type CoursesListResponse,
  type CreateCoursePayload,
  type CreateCourseResponse,
} from "../services/coursesApi";
import { queryKeys } from "@/lib/query-keys";
import type { Course } from "@/types/couse";

// Type for API error response
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Hook for creating a new course
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData: CreateCoursePayload) =>
      coursesApi.createCourse(courseData),
    onSuccess: (response: CreateCourseResponse) => {
      const course = response.data;

      // Invalidate related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.list(
          JSON.stringify({ academy_id: course.academy_id })
        ),
      });

      toast.success(response.message || "تم إنشاء المادة التعليمية بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء إنشاء المادة التعليمية";
      toast.error(errorMessage);
      console.error("Error creating course:", error);
    },
  });
};

// Hook for updating an existing course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      courseData,
    }: {
      id: string;
      courseData: Partial<CreateCoursePayload>;
    }) => coursesApi.updateCourse(id, courseData),
    onSuccess: (
      updatedCourse: Course,
      variables: { id: string; courseData: Partial<CreateCoursePayload> }
    ) => {
      // 1. Update general courses cache
      queryClient.setQueryData(
        queryKeys.courses.lists(),
        (oldData: CoursesListResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.courses.map((course) =>
              course.id === variables.id ? updatedCourse : course
            ),
          };
        }
      );

      toast.success("تم تحديث المادة التعليمية بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء تحديث المادة التعليمية";
      toast.error(errorMessage);
      console.error("Error updating course:", error);
    },
  });
};

// Hook for deleting a course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course: Course) => coursesApi.deleteCourse(course.id),
    onMutate: async (course: Course) => {
      // Cancel any outgoing refetches to avoid optimistic update conflicts
      await queryClient.cancelQueries({
        queryKey: queryKeys.courses.list(String(course.academy_id)),
      });

      // Get the previous data for rollback
      const previousData = queryClient.getQueryData(
        queryKeys.courses.list(String(course.academy_id))
      );

      // Optimistically remove the course from the cache
      queryClient.setQueryData(
        queryKeys.courses.list(String(course.academy_id)),
        (oldData: CoursesListResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              courses: oldData.data.courses.filter(
                (existingCourse: Course) => existingCourse.id !== course.id
              ),
            },
          };
        }
      );

      return { previousData, course };
    },
    onSuccess: (_, course: Course) => {
      // Invalidate the academy courses query to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.list(String(course.academy_id)),
      });

      toast.success("تم حذف المادة التعليمية بنجاح!");
    },
    onError: (error: ApiError, course: Course, context) => {
      // Revert optimistic updates on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.courses.list(String(course.academy_id)),
          context.previousData
        );
      }

      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء حذف المادة التعليمية";
      toast.error(errorMessage);
      console.error("Error deleting course:", error);
    },
  });
};
