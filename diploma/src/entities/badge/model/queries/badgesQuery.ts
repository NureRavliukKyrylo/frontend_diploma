import {
  getAdminBadgeById,
  getAdminBadgeList,
  getAdminBadgeRequests,
  getBadgeId,
  getMyBadges,
  type AdminBadgesFilter,
  type MyBadgesSearchParams,
} from "../../api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const badgesKeys = {
  all: () => ["badges"] as const,
  my: () => [...badgesKeys.all(), "my"],
  id: (id: string) => [...badgesKeys.all(), "id", id],
  adminList: (params: AdminBadgesFilter) =>
    [...badgesKeys.all(), "admin-list", params] as const,
  adminDetails: (id: string) =>
    [...badgesKeys.all(), "admin-details", id] as const,
  adminRequests: (id: string) =>
    [...badgesKeys.all(), "admin-requests", id] as const,
  infinite: (params: MyBadgesSearchParams) =>
    [...badgesKeys.my(), "infinite", params] as const,
};

export const badgesQuery = {
  my: () =>
    queryOptions({
      queryKey: badgesKeys.my(),
      queryFn: () => getMyBadges(),
    }),
  infiniteMy: (params: MyBadgesSearchParams) =>
    infiniteQueryOptions({
      queryKey: badgesKeys.infinite(params),
      queryFn: ({ pageParam }) => getMyBadges({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: badgesKeys.id(id),
      queryFn: () => getBadgeId(id),
      select: (res) => res.data,
    }),
  adminList: (params: AdminBadgesFilter) =>
    queryOptions({
      queryKey: badgesKeys.adminList(params),
      queryFn: () => getAdminBadgeList(params),
      placeholderData: (previousData) => previousData,
      staleTime: 30_000,
    }),
  adminDetails: (id: string) =>
    queryOptions({
      queryKey: badgesKeys.adminDetails(id),
      queryFn: () => getAdminBadgeById(id),
      enabled: Boolean(id),
      staleTime: 30_000,
    }),
  adminRequests: (id: string) =>
    queryOptions({
      queryKey: badgesKeys.adminRequests(id),
      queryFn: () => getAdminBadgeRequests(id),
      enabled: Boolean(id),
      staleTime: 30_000,
    }),
};
