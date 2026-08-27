import { apiClient } from "@shared/api";
import type { OrganizationSearchParams } from "../../lib/search-schema/organizationSearchSchema";
import type { OrganizationResponse } from "../../model/types/OrganizationResponse";

export const getOrganizationsList = async (
  params: OrganizationSearchParams,
): Promise<OrganizationResponse> => {
  const response = await apiClient.get("/Organization/list", {
    params,
  });

  return response.data;
};
