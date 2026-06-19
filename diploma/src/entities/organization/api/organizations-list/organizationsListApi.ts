import { apiClient } from "@shared/api";
import type { OrganizationSearchParams } from "../../lib/search-schema/organizationSearchSchema";
import { normalizeOrganizationsResponse } from "../../lib/normalizeOrganizationResponse";
import type { OrganizationResponse } from "../../model/types/OrganizationResponse";

export const getOrganizationsList = async (
  params: OrganizationSearchParams,
): Promise<OrganizationResponse> => {
  const response = await apiClient.get<unknown>("/Organization/list", {
    params,
  });

  return normalizeOrganizationsResponse(response.data);
};
