export interface AcademyResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    academy: Academy;
    about: string | null;
    // sliders: any[]; // You can replace `any` with a specific type if known
    // faqs: any[];
    // opinions: any[];
    settings: Settings;
  };
  path: string | null;
  timestamp: string;
}

export interface Academy {
  id: number;
  name: string;
  subdomain: string | null;
  slug: string;
  domain: string;
  email: string;
  phone: string;
  address: string | null;
  logo: string | null;
  banner: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export interface Settings {
  platform_name: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  default_currency: string;
  vat_percentage: string;
  platform_fee_percentage: string;
  max_withdrawal_amount: string;
  min_withdrawal_amount: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
  snapchat: string;
  tiktok: string;
  telegram: string;
  discord: string;
  subdomain: string;
  logo: string;
  favicon: string;
  banner: string;
  custom_css: string;
  custom_js: string;
}
