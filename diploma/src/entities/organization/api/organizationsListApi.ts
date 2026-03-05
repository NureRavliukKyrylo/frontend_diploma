import { apiClient } from "@shared/api";
import type { Organization } from "../model/types/Organization";
import type { PaginationResponse } from "@shared/config/types";

export interface OrganizationResponse {
  data: Organization[];
  pagination: PaginationResponse;
}

export interface OrganizationSearchParams {
  page?: number;
  pageSize: number;
}

export const getOrganizationsList = async (
  params: OrganizationSearchParams,
): Promise<OrganizationResponse> => {
  const result = await apiClient.get("/Organizations/list", { params });
  return result.data;
};
