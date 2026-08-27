import { apiClient } from "@shared/api";
import type { ApiResponse } from "@shared/api/types/apiResponse";
import type {
  VolunteerRecommendation,
  VolunteerRecommendationsParams,
} from "../model/types/VolunteerRecommendation";

export const getVolunteerRecommendations = async ({
  entityType,
  entityId,
  take = 20,
}: VolunteerRecommendationsParams): Promise<VolunteerRecommendation[]> => {
  const response = await apiClient.get<
    ApiResponse<VolunteerRecommendation[]>
  >("recommendations/volunteers", {
    params: { entityType, entityId, take },
  });

  return response.data.data;
};
