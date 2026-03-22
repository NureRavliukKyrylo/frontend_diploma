import { apiClient } from "@shared/api";
import type { Organization } from "../../model";
import type { PaginationResponse } from "@shared/config/types";
import type { OrganizationSearchParams } from "../../libs";

export interface OrganizationResponse {
  data: Organization[];
  pagination: PaginationResponse;
}

export const getOrganizationsList = async (
  params: OrganizationSearchParams,
): Promise<OrganizationResponse> => {
  const result = await apiClient.get("/Organization/list", { params });
  return result.data;
};
