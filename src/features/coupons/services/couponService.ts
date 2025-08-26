import { api } from "@/lib/axios";
import type {
  Coupon,
  CouponPayload,
  CouponResponse,
  CouponStats,
} from "@/types/coupon";

export const couponService = {
  getCoupons: async (): Promise<Coupon[]> => {
    const response = await api.get("/coupons/");
    return response.data.data;
  },

  getCoupon: async (id: number): Promise<Coupon> => {
    const response = await api.get(`/coupons/${id}`);
    return response.data.data;
  },

  createCoupon: async (data: CouponPayload): Promise<CouponResponse> => {
    const response = await api.post("/coupons", data);
    return response.data.data;
  },

  updateCoupon: async (
    id: number,
    data: Partial<CouponPayload>
  ): Promise<CouponResponse> => {
    const response = await api.put(`/coupons/${id}`, data);
    return response.data.data;
  },

  deleteCoupon: async (id: number): Promise<void> => {
    await api.delete(`/coupons/${id}`);
  },

  updateCouponStatus: async (
    id: number,
    status: "active" | "inactive"
  ): Promise<Coupon> => {
    const response = await api.patch(`/coupons/${id}/status`, { status });
    return response.data.data;
  },

  getCouponStats: async (): Promise<CouponStats> => {
    const response = await api.get("/coupons/stats");
    return response.data.data;
  },

  getCouponStatsById: async (id: number): Promise<unknown> => {
    const response = await api.get(`/coupons/${id}/stats`);
    return response.data.data;
  },

  duplicateCoupon: async (id: number): Promise<Coupon> => {
    const response = await api.post(`/coupons/${id}/duplicate`);
    return response.data.data;
  },

  validateCoupon: async (
    code: string,
    orderAmount: number
  ): Promise<unknown> => {
    const response = await api.post("/coupons/validate", { code, orderAmount });
    return response.data.data;
  },
};
