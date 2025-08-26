import { useQuery } from "@tanstack/react-query";
import { couponService } from "../services/couponService";
import { queryKeys } from "@/lib/query-keys";

export const useCoupons = () => {
  return useQuery({
    queryKey: queryKeys.coupons.lists(),
    queryFn: () => couponService.getCoupons(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCoupon = (id: number) => {
  return useQuery({
    queryKey: queryKeys.coupons.detail(String(id)),
    queryFn: () => couponService.getCoupon(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCouponStats = () => {
  return useQuery({
    queryKey: queryKeys.coupons.stats(),
    queryFn: () => couponService.getCouponStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
