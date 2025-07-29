import { queryKeys } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  academyTemplateApi,
  type AcademyMainSettingsResponse,
} from "../services/academyTemplate";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useAcademyMainSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) =>
      academyTemplateApi.updateAcademyTemplate(data),
    onSuccess: (response: AcademyMainSettingsResponse) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.academy.mainSettings(),
      });
      toast.success(response.message || "تم تحديث الإعدادات بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء تحديث الإعدادات";
      toast.error(errorMessage);
      console.error("Error updating academy settings:", error);
    },
  });
};
