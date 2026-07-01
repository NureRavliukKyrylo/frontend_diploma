import type { EntityType } from "@shared/config/types";
import { apiClient } from "@shared/api";

export interface CreateInvitationPayload {
  userId: string;
  message?: string;
}

export const createInvitation = async (
  entityType: EntityType,
  entityId: string,
  payload: CreateInvitationPayload,
) => {
  const response = await apiClient.post(
    `invitations/${entityType}/${entityId}`,
    payload,
  );

  return response.data;
};
