import { apiClient } from "@shared/api";
import type { EntityType } from "@shared/config/types";

export interface CreateFeedbackDto {
  entityType: EntityType;
  entityId: string;
  rating: number;
  comment: string;
}

export const createFeedback = async (data: CreateFeedbackDto) => {
  const response = await apiClient.post("/Feedback/create", data);
  return response.data;
};
