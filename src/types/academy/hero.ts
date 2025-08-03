export interface Hero {
  id: string | number;
  mainTitle: string;
  subTitle: string;
  description: string;
  firstLinkTitle: string;
  firstLinkUrl: string;
  secondLinkTitle: string;
  secondLinkUrl: string;
}

export interface HeroResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Hero;
  path: string | null;
  timestamp: string;
}

export interface HeroPayload {
  mainTitle: string;
  subTitle: string;
  description: string;
  firstLinkTitle: string;
  firstLinkUrl: string;
  secondLinkTitle: string;
  secondLinkUrl: string;
}
