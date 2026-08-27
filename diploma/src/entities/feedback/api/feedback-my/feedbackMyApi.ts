import type { Feedback } from "@entities/feedback/model";
import { apiClient } from "@shared/api";
import type { EntityType } from "@shared/config/types";
import type { ApiResponse } from "@shared/api";
export const getMyFeedback = async (
  entityType: EntityType,
  entityId: string,
): Promise<ApiResponse<Feedback>> => {
  const result = await apiClient.get(
    `Feedback/my/entity/${entityType}/${entityId}`,
  );
  return result.data;
};
