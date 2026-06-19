import { apiClient } from "@shared/api";
import { normalizeOrganizationRequests } from "../lib/normalizeOrganizationRequest";
import type { OrganizationJoinRequest } from "../model/types/OrganizationRequest";

export const getMyOrganizationJoinRequests = async (
  organizationId: string,
): Promise<OrganizationJoinRequest[]> => {
  const response = await apiClient.get<unknown>("Requests/list", {
    params: {
      Type: "OrganizationJoin",
      TargetEntityType: "organization",
      TargetEntityId: organizationId,
      Page: 1,
      PageSize: 20,
    },
  });

  return normalizeOrganizationRequests(response.data);
};
