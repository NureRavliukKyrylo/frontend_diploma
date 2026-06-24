import { queryOptions } from "@tanstack/react-query";
import { getProfile, getProfileById, getStatisticsVolunteer } from "../../api";

export const profileKeys = {
  all: () => ["profile"] as const,
  byId: (userId: string) => [...profileKeys.all(), "user", userId] as const,
  statistics: () => [...profileKeys.all(), "statistics"],
};

export const profileQuery = {
  all: () =>
    queryOptions({
      queryKey: profileKeys.all(),
      queryFn: getProfile,
    }),
  byId: (userId: string) =>
    queryOptions({
      queryKey: profileKeys.byId(userId),
      queryFn: () => getProfileById(userId),
      enabled: Boolean(userId),
    }),
  statistics: () =>
    queryOptions({
      queryKey: profileKeys.statistics(),
      queryFn: getStatisticsVolunteer,
    }),
};
