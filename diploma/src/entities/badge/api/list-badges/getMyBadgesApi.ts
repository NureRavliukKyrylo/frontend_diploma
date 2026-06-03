import type { PaginationResponse } from "@shared/config/types";
import type { Badge } from "../../model";
import { apiClient } from "@shared/api";

interface MyBadgesRespone {
  data: Badge[];
  pagination: PaginationResponse;
}

export interface MyBadgesSearchParams {
  Page?: number;
  PageSize?: number;
  Status: "locked" | "unlocked";
}

export const getMyBadges = async (
  params?: MyBadgesSearchParams,
): Promise<MyBadgesRespone> => {
  const response = await apiClient.get("Badges/my", { params });
  return response.data;
};
