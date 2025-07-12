import axios from "@/lib/axios";
import type { Course } from "@/types/couse";

// Types for API requests
export interface CreateCoursePayload {
  category_id: string;
  trainer_id?: string;
  title: string;
  content: string;
  short_content: string;
  price: string;
  discount_price: string;
  type?: string;
  level: string;
  featured?: boolean;
  image: File | null;
  discount_ends_at?: string;
  preview_video: File | null;
  learning_outcomes: string;
  requirements: string;
}

// Types for API responses

export interface CoursesListResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    courses: Course[];
  };
}

export interface CreateCourseResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Course;
}

// API service for courses
export const coursesApi = {
  getCourses: async (): Promise<CoursesListResponse> => {
    const response = await axios.get("/academy/courses");
    return response.data;
  },

  // Get single course by ID
  getCourse: async (id: string): Promise<CreateCourseResponse> => {
    const response = await axios.get(`/academy/courses/${id}`);
    return response.data;
  },

  // Create new course
  createCourse: async (
    courseData: CreateCoursePayload
  ): Promise<CreateCourseResponse> => {
    // Create FormData for file uploads
    const formData = new FormData();

    // Append all form fields
    Object.entries(courseData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          // Handle array fields like gallery
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}[${index}]`, item);
            }
          });
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await axios.post("/academy/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update existing course
  updateCourse: async (
    id: string,
    courseData: Partial<CreateCoursePayload>
  ): Promise<Course> => {
    // Create FormData for file uploads if needed
    const formData = new FormData();

    Object.entries(courseData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          // Handle array fields like gallery
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}[${index}]`, item);
            }
          });
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
    await axios.delete(`/courses/academy/courses/${id}`);
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
};
