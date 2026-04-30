import { getBadgeId, getMyBadges, type MyBadgesSearchParams } from "../../api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const badgesKeys = {
  all: () => ["badges"] as const,
  my: () => [...badgesKeys.all(), "my"],
  id: (id: string) => [...badgesKeys.all(), "id", id],
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
};
