import axios from "@/lib/axios";
import type { ICourseForm } from "@/validations/course";

// Types for API responses
export interface Course {
  id: string;
  title: string;
  category: string;
  type: string;
  instructor: string;
  level: string;
  price: number;
  description: string;
  shortContent: string;
  skills: string;
  requirements: string;
  image?: File | string;
  video?: File | string;
  createdAt: string;
  updatedAt: string;
  studentsCount: number;
  rating: number;
  isPublished: boolean;
}

export interface CoursesListResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCourseResponse {
  course: Course;
  message: string;
  status_code: number;
}

// API service for courses
export const coursesApi = {
  // Get all courses with pagination and filters
  getCourses: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    level?: string;
    instructor?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<CoursesListResponse> => {
    const response = await axios.get("/courses", { params });
    return response.data;
  },

  // Get single course by ID
  getCourse: async (id: string): Promise<Course> => {
    const response = await axios.get(`/courses/${id}`);
    return response.data.course;
  },

  // Create new course
  createCourse: async (courseData: ICourseForm): Promise<Course> => {
    // Create FormData for file uploads
    const formData = new FormData();

    // Append all form fields
    Object.entries(courseData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await axios.post("/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.course;
  },

  // Update existing course
  updateCourse: async (
    id: string,
    courseData: Partial<ICourseForm>
  ): Promise<Course> => {
    // Create FormData for file uploads if needed
    const formData = new FormData();

    Object.entries(courseData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await axios.put(`/courses/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.course;
  },

  // Delete course
  deleteCourse: async (id: string): Promise<void> => {
    await axios.delete(`/courses/${id}`);
  },

  // Bulk delete courses
  bulkDeleteCourses: async (courseIds: string[]): Promise<void> => {
    await axios.post("/courses/bulk-delete", { courseIds });
  },

  // Get course categories
  getCategories: async (): Promise<string[]> => {
    const response = await axios.get("/courses/categories");
    return response.data.categories;
  },

  // Get course instructors
  getInstructors: async (): Promise<
    Array<{ id: string; name: string; email: string }>
  > => {
    const response = await axios.get("/courses/instructors");
    return response.data.instructors;
  },

  // Publish/Unpublish course
  toggleCourseStatus: async (
    id: string,
    isPublished: boolean
  ): Promise<Course> => {
    const response = await axios.patch(`/courses/${id}/status`, {
      isPublished,
    });
    return response.data.course;
  },

  // Get course analytics
  getCourseAnalytics: async (
    id: string
  ): Promise<{
    enrollments: number;
    completions: number;
    revenue: number;
    rating: number;
    reviews: number;
  }> => {
    const response = await axios.get(`/courses/${id}/analytics`);
    return response.data.analytics;
  },
};
