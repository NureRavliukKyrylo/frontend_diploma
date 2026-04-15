import { infiniteQueryOptions } from "@tanstack/react-query";
import {
  getUserRelatedFilters,
  type UserRelatedFiltersParams,
} from "../get-filters/volunteerFilters";

export const filtersKeys = {
  all: () => ["filters"] as const,
  infinite: (params: UserRelatedFiltersParams) =>
    [...filtersKeys.all(), "infinite", params] as const,
};

export const filtersQuery = {
  infinite: (params: UserRelatedFiltersParams) =>
    infiniteQueryOptions({
      queryKey: filtersKeys.infinite(params),
      queryFn: ({ pageParam }) =>
        getUserRelatedFilters({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};
