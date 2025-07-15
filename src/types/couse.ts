import type { UserType } from "@/constants/enums";

export interface Category {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  status: boolean;
}

export interface Trainer {
  avatar: string | null;
  email: string;
  fname: string;
  id: number;
  lname: string;
  user_type: UserType;
}
export interface Course {
  id: string;
  academy_id: number;
  category_id: number;
  category: Category;
  trainer: Trainer | null;
  trainer_id: number;
  slug: string;
  image: string;
  content: string;
  short_content: string;
  preparations: string | null;
  requirements: string;
  learning_outcomes: string;
  gallery: string | null;
  preview_video: string;
  course_state: "draft" | "published" | "archived"; // adjust based on your states
  featured: boolean;
  type: "recorded" | "live"; // add other possible values if needed
  level: "beginner" | "intermediate" | "advanced";
  url: string | null;
  platform_fee_percentage: number;
  avg_rating: number;
  ratings_count: number | null;
  students_count: number;
  lessons_count: number;
  completion_rate: number;
  created_at: string; // or Date if parsed
  updated_at: string; // or Date if parsed
  title: string;
  price: number | null;
  discount_price: number | null;
  discount_ends_at: string | null; // or Date if parsed
}
