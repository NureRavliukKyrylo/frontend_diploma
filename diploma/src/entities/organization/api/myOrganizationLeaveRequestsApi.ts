import { apiClient } from "@shared/api";
import { normalizeOrganizationRequests } from "../lib/normalizeOrganizationRequest";
import type { OrganizationLeaveRequest } from "../model/types/OrganizationRequest";

export const getMyOrganizationLeaveRequests = async (
  organizationId: string,
): Promise<OrganizationLeaveRequest[]> => {
  const response = await apiClient.get<unknown>("Requests/list", {
    params: {
      Type: "OrganizationLeave",
      TargetEntityType: "organization",
      TargetEntityId: organizationId,
      Page: 1,
      PageSize: 20,
    },
  });

  return normalizeOrganizationRequests(response.data);
};
