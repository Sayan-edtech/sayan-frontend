import { useMutation, useQueryClient } from "@tanstack/react-query";
import { couponService } from "../services/couponService";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import type { ApiError } from "@/lib/axios";
import type { CouponPayload, CouponResponse } from "@/types/coupon";

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CouponPayload) => couponService.createCoupon(data),
    onSuccess: (response: CouponResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.coupons.all,
      });

      toast.success(response.message || "تم إنشاء الكوبون بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء إنشاء الكوبون";
      toast.error(errorMessage);
      console.error("Error creating coupon:", error);
    },
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CouponPayload }) =>
      couponService.updateCoupon(id, data),
    onSuccess: (response: CouponResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.coupons.all,
      });

      toast.success(response.message || "تم تحديث الكوبون بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء تحديث الكوبون";
      toast.error(errorMessage);
      console.error("Error updating coupon:", error);
    },
  });
};
export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => couponService.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.coupons.all,
      });

      toast.success("تم حذف الكوبون بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء حذف الكوبون";
      toast.error(errorMessage);
      console.error("Error deleting coupon:", error);
    },
  });
};
