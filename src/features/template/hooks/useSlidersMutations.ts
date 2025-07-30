import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { slidersApi } from "../services/slidersApi";
import type { SliderPayload, SliderResponse } from "@/types/slider";
import { queryKeys } from "@/lib/query-keys";

// Type for API error response
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Hook for creating a new slider
export const useCreateSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sliderData: SliderPayload) => slidersApi.createSlider(sliderData),
    onSuccess: (response: SliderResponse) => {
      // Invalidate all sliders-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.sliders.lists(),
      });

      toast.success(response.message || "تم إنشاء السلايدر بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء إنشاء السلايدر";
      toast.error(errorMessage);
      console.error("Error creating slider:", error);
    },
  });
};

// Hook for updating an existing slider
export const useUpdateSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SliderPayload }) =>
      slidersApi.updateSlider(id, data),
    onSuccess: (response: SliderResponse) => {
      // Invalidate all sliders-related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.sliders.lists(),
      });

      toast.success(response.message || "تم تحديث السلايدر بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء تحديث السلايدر";
      toast.error(errorMessage);
      console.error("Error updating slider:", error);
    },
  });
};

// Hook for deleting a slider
export const useDeleteSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => slidersApi.deleteSlider(id),
    onSuccess: (response: SliderResponse) => {
      // Invalidate all sliders-related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.sliders.lists(),
      });

      toast.success(response.message || "تم حذف السلايدر بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء حذف السلايدر";
      toast.error(errorMessage);
      console.error("Error deleting slider:", error);
    },
  });
}; 