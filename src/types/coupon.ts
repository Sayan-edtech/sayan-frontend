import type { Course } from "./couse";

export interface Coupon {
  code: string;
  coupon_type: "percentage" | "fixed";
  flat_discount: number | null;
  percentage: number;
  max_discount: number;
  usage_limit: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  id: number;
  owner_id: number;
  used_count: number;
  created_at: string;
  updated_at: string | null;
  status: "expired" | "active" | "inactive";
  usage_percentage: number;
  days_remaining: number;
}

export interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
  totalUsage: number;
  totalSavings: number;
}

export interface CouponPayload {
  code: string;
  coupon_type: "percentage" | "fixed";
  application_scope: "GENERAL" | "SPECIFIC";
  percentage?: number;
  max_discount?: number;
  usage_limit: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  applicable_courses?: Course[];
}
export interface CouponResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    coupons: Coupon[];
    total: 1;
    page: 1;
    size: 100;
  };
}
