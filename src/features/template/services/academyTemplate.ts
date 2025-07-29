import axios from "@/lib/axios";

export interface AcademyMainSettingsResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    platform_name: string;
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
  };
}

export const academyTemplateApi = {
  getAcademyTemplate: async (): Promise<AcademyMainSettingsResponse> => {
    const response = await axios.get("/settings/academy");
    return response.data;
  },
  checkSubdomain: async (
    subdomain: string
  ): Promise<{ available: boolean; message?: string }> => {
    const response = await axios.get(
      `/api/academy/check-subdomain?subdomain=${encodeURIComponent(subdomain)}`
    );
    return response.data;
  },
  updateAcademyTemplate: async (
    data: FormData
  ): Promise<AcademyMainSettingsResponse> => {
    const response = await axios.put("/settings/academy", data, {
      headers: {
        "Content-Type": "form-data",
      },
    });
    return response.data;
  },
};
