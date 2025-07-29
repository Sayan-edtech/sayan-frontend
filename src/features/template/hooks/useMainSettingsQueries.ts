import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { academyTemplateApi } from "../services/academyTemplate";

export function useAcademyMainSettings(subdomain?: string) {
  return useQuery({
    queryKey: subdomain
      ? queryKeys.academy.mainSettingsDetail(subdomain)
      : queryKeys.academy.mainSettings(),
    queryFn: () => academyTemplateApi.getAcademyTemplate(),
    retry: false,
  });
}

export function useCheckSubdomain(subdomain: string, enabled = false) {
  return useQuery({
    queryKey: ["check-subdomain", subdomain],
    queryFn: () => academyTemplateApi.checkSubdomain(subdomain),
    enabled: enabled && !!subdomain,
    retry: false,
  });
}
