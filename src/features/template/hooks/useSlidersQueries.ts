import { useQuery } from "@tanstack/react-query";
import { slidersApi } from "../services/slidersApi";
import type { SlidersListResponse, SliderResponse } from "@/types/slider";
import { queryKeys } from "@/lib/query-keys";

// Hook for fetching all sliders
export const useSliders = () => {
  return useQuery<SlidersListResponse>({
    queryKey: queryKeys.sliders.lists(),
    queryFn: () => slidersApi.getSliders(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single slider by ID
export const useSlider = (id: string) => {
  return useQuery<SliderResponse>({
    queryKey: queryKeys.sliders.detail(id),
    queryFn: () => slidersApi.getSlider(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};