import { apiClient } from "@shared/api";
import type { Organization } from "../../model";
import type { PaginationResponse } from "@shared/config/types";
import type { OrganizationPaginationParams } from "../../libs";

export interface OrganizationResponse {
  data: Organization[];
  pagination: PaginationResponse;
}

export const getOrganizationsListFilters = async (
  params?: OrganizationPaginationParams,
): Promise<OrganizationResponse> => {
  const result = await apiClient.get(
    "Projects/my/volunteer/filter-organizations",
    { params },
  );
  return result.data;
};
