import { apiClient } from "@shared/api";
import type { EntityType } from "@shared/config/types";

export interface JoinParticipationDto {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  roleId?: string;
}

export const joinParticipation = async (data: JoinParticipationDto) => {
  const result = await apiClient.post("/Participation/join", data);
  return result.data;
};
