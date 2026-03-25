import { apiClient } from "@shared/api/api-client/apiClient";
import type {
  EntityType,
  PaginationResponse,
  ParticipationMember,
} from "@shared/config/types";

export interface GetMembersParams {
  entityType: EntityType;
  entityId: string;
  page?: number;
  pageSize?: number;
}

export interface GetMembersResponse {
  data: ParticipationMember[];
  pagination: PaginationResponse;
}

export const getMembers = async ({
  entityType,
  entityId,
  page,
  pageSize,
}: GetMembersParams): Promise<GetMembersResponse> => {
  const response = await apiClient.get(
    `/Participation/entity/${entityType}/${entityId}/members`,
    { params: { page, pageSize } },
  );
  return response.data;
};
