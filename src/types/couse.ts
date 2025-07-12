import type { UserType } from "@/constants/enums";

export interface Course {
  id: string;
  academy_id: number;
  category_id: number;
  category: {
    content: string;
    id: number;
    image: string | null;
    slug: string;
    status: boolean;
    title: string;
  };
  trainer: {
    avatar: string | null;
    email: string;
    fname: string;
    id: number;
    lname: string;
    user_type: UserType;
  };
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
  ratings_count: number;
  students_count: number;
  lessons_count: number;
  completion_rate: number;
  created_at: string; // or Date if parsed
  updated_at: string; // or Date if parsed
  title: string;
  price: number;
  discount_price: number | null;
  discount_ends_at: string | null; // or Date if parsed
}
