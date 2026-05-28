import type { Feedback } from "@entities/feedback/model";
import { apiClient } from "@shared/api";
import type { EntityType } from "@shared/config/types";

export const getMyFeedback = async (
  entityType: EntityType,
  entityId: string,
): Promise<Feedback> => {
  const result = await apiClient.get(
    `Feedback/entity/${entityType}/${entityId}`,
  );
  return result.data;
};
