export interface About {
  id: number;
  sub_title: string;
  feature_one: string;
  image: string | null;
  vision: string;
  video_url: string | null;
  updated_at: string;
  academy_id: number;
  title: string;
  content: string;
  feature_two: string;
  mission: string;
  values: string[];
  created_at: string;
}

export interface AboutResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: About;
  path: string | null;
  timestamp: string;
}

export interface AboutPayload {
  title: string;
  content: string;
  feature_one: string;
  feature_two: string;
  image?: File;
}
