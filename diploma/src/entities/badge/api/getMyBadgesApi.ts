import type { PaginationResponse } from "@shared/config/types";
import type { Badge } from "../model";
import { apiClient } from "@shared/api";

interface MyBadgesRespone {
  data: Badge[];
  pagination: PaginationResponse;
}

export const getMyBadges = async (): Promise<MyBadgesRespone> => {
  const response = await apiClient.get("Badges/my");
  return response.data;
};
