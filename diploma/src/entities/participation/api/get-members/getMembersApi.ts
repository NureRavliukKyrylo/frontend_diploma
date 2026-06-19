import { apiClient } from "@shared/api";
import type {
  EntityType,
  PaginationResponse,
} from "@shared/config/types";
import type { ParticipationListItem } from "../../model/types/ParticipationListItem";

export interface GetMembersParams {
  entityType: EntityType;
  entityId: string;
  page?: number;
  pageSize?: number;
}

export interface GetMembersResponse {
  data: ParticipationListItem[];
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
