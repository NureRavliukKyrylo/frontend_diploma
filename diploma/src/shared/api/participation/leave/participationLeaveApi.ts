import type { EntityType } from "@shared/config/types";
import { apiClient } from "@shared/api";

export interface LeaveParticipationDto {
  entityType: EntityType;
  entityId: string;
  comment?: string;
}

export const leaveParticipation = async (data: LeaveParticipationDto) => {
  const result = await apiClient.post("/Participation/leave", data);
  return result.data;
};
