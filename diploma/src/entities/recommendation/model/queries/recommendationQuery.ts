import { queryOptions } from "@tanstack/react-query";
import { getVolunteerRecommendations } from "../../api/getVolunteerRecommendations";
import type { VolunteerRecommendationsParams } from "../types/VolunteerRecommendation";

export const recommendationKeys = {
  all: () => ["recommendations"] as const,
  volunteers: (params: VolunteerRecommendationsParams) =>
    [...recommendationKeys.all(), "volunteers", params] as const,
};

export const recommendationQuery = {
  volunteers: (params: VolunteerRecommendationsParams) =>
    queryOptions({
      queryKey: recommendationKeys.volunteers(params),
      queryFn: () => getVolunteerRecommendations(params),
      enabled: Boolean(params.entityId),
    }),
};
