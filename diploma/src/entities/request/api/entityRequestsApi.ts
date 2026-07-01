import { apiClient } from "@shared/api";
import type { EntityType } from "@shared/config/types";
import { normalizePendingEntityRequests } from "../lib/normalizePendingEntityRequests";
import type {
  EntityRequestKind,
  PendingEntityRequest,
} from "../model/types";

export const getPendingEntityRequests = async (
  entityType: EntityType,
  entityId: string,
  kind: EntityRequestKind,
): Promise<PendingEntityRequest[]> => {
  const response = await apiClient.get<unknown>(`Requests/${kind}/list`, {
    params: {
      entityType,
      entityId,
      Page: 1,
      PageSize: 100,
    },
  });

  return normalizePendingEntityRequests(response.data, kind);
};

export const approveEntityRequest = async (
  requestId: string,
  comment?: string,
) => {
  const response = await apiClient.post(`Requests/${requestId}/approve`, {
    comment: comment?.trim() || undefined,
  });

  return response.data;
};

export const rejectEntityRequest = async (
  requestId: string,
  comment?: string,
) => {
  const response = await apiClient.post(`Requests/${requestId}/reject`, {
    comment: comment?.trim() || undefined,
  });

  return response.data;
};
