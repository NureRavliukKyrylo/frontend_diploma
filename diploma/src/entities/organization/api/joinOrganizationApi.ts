import { apiClient } from "@shared/api";
import { normalizeJoinOrganizationResponse } from "../lib/normalizeOrganizationMutationResponse";
import type { JoinOrganizationResponse } from "../model/types/OrganizationParticipation";

export const joinOrganization = async (
  organizationId: string,
): Promise<JoinOrganizationResponse> => {
  const response = await apiClient.post<JoinOrganizationResponse>("Participation/join", {
    entityType: "organization",
    entityId: organizationId,
  });

  return normalizeJoinOrganizationResponse(response.data);
};
