import { queryOptions } from "@tanstack/react-query";
import { getCountActivities } from "../api/countActivitiesApi";

export const activityKeys = {
  all: () => ["activities-count"] as const,
};

export const activityQuery = {
  count: () =>
    queryOptions({
      queryKey: activityKeys.all(),
      queryFn: () => getCountActivities(),
      placeholderData: (prev) => prev,
    }),
};
