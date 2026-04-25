import { apiClient } from "@shared/api";
import type { EntityType, PaginationResponse } from "@shared/config/types";
import type { Feedback } from "../../model";

export interface FeedbacksResponse {
  data: Feedback[];
  pagination: PaginationResponse;
}

export interface FeedbackSearchParams {
  Page?: number;
  PageSize?: number;
  OrderBy?: any; //so far any
}

export const getFeedbacksEntity = async (
  entityType: EntityType,
  entityId: string,
  params?: FeedbackSearchParams,
): Promise<FeedbacksResponse> => {
  const response = await apiClient.get(
    `/Feedback/entity/${entityType}/${entityId}`,
    { params },
  );
  return response.data;
};
