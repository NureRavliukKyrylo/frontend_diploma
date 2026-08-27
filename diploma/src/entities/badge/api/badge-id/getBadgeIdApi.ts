import type { Badge } from "@entities/badge/model";
import { apiClient, type ApiResponse } from "@shared/api";

export const getBadgeId = async (id: string): Promise<ApiResponse<Badge>> => {
  const result = await apiClient.get(`Badges/${id}`);
  return result.data;
};
