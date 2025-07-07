// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import {
//   coursesApi,
//   type Course,
//   type CoursesListResponse,
// } from "../services/coursesApi";
// import { COURSES_QUERY_KEYS } from "../constants/queryKeys";
// import type { ICourseForm } from "@/validations/course";

// // Type for API error response
// interface ApiError {
//   response?: {
//     data?: {
//       message?: string;
//     };
//   };
//   message?: string;
// }

// // Hook for creating a new course
// export const useCreateCourse = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (courseData: ICourseForm) =>
//       coursesApi.createCourse(courseData),
//     onSuccess: (data: Course) => {
//       // Invalidate and refetch courses list
//       queryClient.invalidateQueries({
//         queryKey: [COURSES_QUERY_KEYS.COURSES_LIST],
//       });

//       // Add the new course to the cache optimistically
//       queryClient.setQueryData(
//         [COURSES_QUERY_KEYS.COURSES_LIST],
//         (oldData: CoursesListResponse | undefined) => {
//           if (!oldData)
//             return {
//               courses: [data],
//               total: 1,
//               page: 1,
//               limit: 10,
//               totalPages: 1,
//             };
//           return {
//             ...oldData,
//             courses: [data, ...oldData.courses],
//             total: oldData.total + 1,
//           };
//         }
//       );

//       toast.success("تم إنشاء المادة التعليمية بنجاح!");
//     },
//     onError: (error: ApiError) => {
//       const errorMessage =
//         error?.response?.data?.message ||
//         "حدث خطأ أثناء إنشاء المادة التعليمية";
//       toast.error(errorMessage);
//       console.error("Error creating course:", error);
//     },
//   });
// };

// // Hook for updating an existing course
// export const useUpdateCourse = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       id,
//       courseData,
//     }: {
//       id: string;
//       courseData: Partial<ICourseForm>;
//     }) => coursesApi.updateCourse(id, courseData),
//     onSuccess: (data: Course, variables) => {
//       // Invalidate courses list
//       queryClient.invalidateQueries({
//         queryKey: [COURSES_QUERY_KEYS.COURSES_LIST],
//       });

//       // Update specific course in cache
//       queryClient.setQueryData(
//         [COURSES_QUERY_KEYS.COURSE_DETAIL, variables.id],
//         data
//       );

//       toast.success("تم تحديث المادة التعليمية بنجاح!");
//     },
//     onError: (error: ApiError) => {
//       const errorMessage =
//         error?.response?.data?.message ||
//         "حدث خطأ أثناء تحديث المادة التعليمية";
//       toast.error(errorMessage);
//       console.error("Error updating course:", error);
//     },
//   });
// };

// // Hook for deleting a course
// export const useDeleteCourse = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (courseId: string) => coursesApi.deleteCourse(courseId),
//     onSuccess: (_, courseId: string) => {
//       // Remove from courses list cache
//       queryClient.setQueryData(
//         [COURSES_QUERY_KEYS.COURSES_LIST],
//         (oldData: CoursesListResponse | undefined) => {
//           if (!oldData) return oldData;
//           return {
//             ...oldData,
//             courses: oldData.courses.filter(
//               (course: Course) => course.id !== courseId
//             ),
//             total: oldData.total - 1,
//           };
//         }
//       );

//       // Remove specific course from cache
//       queryClient.removeQueries({
//         queryKey: [COURSES_QUERY_KEYS.COURSE_DETAIL, courseId],
//       });

//       toast.success("تم حذف المادة التعليمية بنجاح!");
//     },
//     onError: (error: ApiError) => {
//       const errorMessage =
//         error?.response?.data?.message || "حدث خطأ أثناء حذف المادة التعليمية";
//       toast.error(errorMessage);
//       console.error("Error deleting course:", error);
//     },
//   });
// };

// // Hook for bulk operations
// export const useBulkDeleteCourses = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (courseIds: string[]) =>
//       coursesApi.bulkDeleteCourses(courseIds),
//     onSuccess: (_, courseIds: string[]) => {
//       // Remove from courses list cache
//       queryClient.setQueryData(
//         [COURSES_QUERY_KEYS.COURSES_LIST],
//         (oldData: CoursesListResponse | undefined) => {
//           if (!oldData) return oldData;
//           return {
//             ...oldData,
//             courses: oldData.courses.filter(
//               (course: Course) => !courseIds.includes(course.id)
//             ),
//             total: oldData.total - courseIds.length,
//           };
//         }
//       );

//       // Remove specific courses from cache
//       courseIds.forEach((id) => {
//         queryClient.removeQueries({
//           queryKey: [COURSES_QUERY_KEYS.COURSE_DETAIL, id],
//         });
//       });

//       toast.success(`تم حذف ${courseIds.length} مادة تعليمية بنجاح!`);
//     },
//     onError: (error: ApiError) => {
//       const errorMessage =
//         error?.response?.data?.message || "حدث خطأ أثناء حذف المواد التعليمية";
//       toast.error(errorMessage);
//       console.error("Error bulk deleting courses:", error);
//     },
//   });
// };
