export interface About {
  id: string | number;
  title: string;
  description: string;
  featureOne: string;
  featureTwo: string;
  heroImage?: string;
  created_at?: string;
  updated_at?: string;
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
  description: string;
  featureOne: string;
  featureTwo: string;
  heroImage?: File | string;
}
