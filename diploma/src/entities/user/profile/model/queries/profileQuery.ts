import { queryOptions } from "@tanstack/react-query";
import { getProfile, getProfileById, getStatisticsVolunteer } from "../../api";
import { getPublicProfileById } from "../../api/profile/publicProfileByIdApi";

export const profileKeys = {
  all: () => ["profile"] as const,
  byId: (userId: string) => [...profileKeys.all(), "user", userId] as const,
  publicById: (userId: string) =>
    [...profileKeys.all(), "public-user", userId] as const,
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
  publicById: (userId: string) =>
    queryOptions({
      queryKey: profileKeys.publicById(userId),
      queryFn: () => getPublicProfileById(userId),
      enabled: Boolean(userId),
      staleTime: 5 * 60 * 1000,
    }),
  statistics: () =>
    queryOptions({
      queryKey: profileKeys.statistics(),
      queryFn: getStatisticsVolunteer,
    }),
};
