import { apiClient } from "@shared/api";
import { normalizeOrganizationPendingRequests } from "../lib/normalizeOrganizationRequest";
import type {
  OrganizationPendingRequest,
  OrganizationRequestKind,
} from "../model/types/OrganizationRequest";

interface UpdateOrganizationMemberRoleParams {
  participationId: string;
  roleId: string;
}

export const getOrganizationPendingRequests = async (
  organizationId: string,
  kind: OrganizationRequestKind,
): Promise<OrganizationPendingRequest[]> => {
  const response = await apiClient.get<unknown>(
    `Requests/${kind}/list`,
    {
      params: {
        entityType: "organization",
        entityId: organizationId,
        Page: 1,
        PageSize: 100,
      },
    },
  );

  return normalizeOrganizationPendingRequests(response.data, kind);
};

export const approveOrganizationRequest = async (
  requestId: string,
  comment?: string,
) => {
  const trimmedComment = comment?.trim();

  const response = await apiClient.post(`Requests/${requestId}/approve`, {
    comment: trimmedComment || undefined,
  });

  return response.data;
};

export const rejectOrganizationRequest = async (
  requestId: string,
  comment?: string,
) => {
  const trimmedComment = comment?.trim();

  const response = await apiClient.post(`Requests/${requestId}/reject`, {
    comment: trimmedComment || undefined,
  });

  return response.data;
};

export const updateOrganizationMemberRole = async ({
  participationId,
  roleId,
}: UpdateOrganizationMemberRoleParams) => {
  const response = await apiClient.put(
    `Participation/${participationId}/role`,
    {
      roleId,
    },
  );

  return response.data;
};
