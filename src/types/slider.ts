export interface Slider {
  id: string | number;
  title: string;
  description: string;
  featureOne: string;
  featureTwo: string;
  heroImage?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SlidersListResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Slider[];
  path: string | null;
  timestamp: string;
}

export interface SliderResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Slider;
  path: string | null;
  timestamp: string;
}

export interface SliderPayload {
  title: string;
  description: string;
  featureOne: string;
  featureTwo: string;
  heroImage?: File | string;
} 