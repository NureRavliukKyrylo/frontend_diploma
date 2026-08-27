import { apiClient } from "@shared/api";
import { unwrapResponsePayload } from "./dashboard/baseNormalizers";
import { normalizeAdvancedStatistics } from "./normalizeAdvancedStatistics";

export const getAdminAdvancedStatistics = async (from?: string, to?: string) => {
  const response = await apiClient.get<unknown>("statistics/advanced", {
    params: { from, to },
  });

  return normalizeAdvancedStatistics(unwrapResponsePayload(response.data));
};