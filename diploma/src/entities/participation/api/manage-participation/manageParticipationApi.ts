import { apiClient } from "@shared/api";
import type { EntityType } from "@shared/config/types";

interface UpdateParticipationRoleParams {
  participationId: string;
  roleId: string;
}

interface RemoveParticipationMemberParams {
  entityType: EntityType;
  entityId: string;
  userId: string;
}

export const updateParticipationRole = async ({
  participationId,
  roleId,
}: UpdateParticipationRoleParams) => {
  const response = await apiClient.put(`Participation/${participationId}/role`, {
    roleId,
  });

  return response.data;
};

export const removeParticipationMember = async ({
  entityType,
  entityId,
  userId,
}: RemoveParticipationMemberParams) => {
  const response = await apiClient.delete(
    `/Participation/entity/${entityType}/${entityId}/users/${userId}`,
  );

  return response.data;
};
