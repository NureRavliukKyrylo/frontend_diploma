import { infiniteQueryOptions } from "@tanstack/react-query";
import {
  getUserRelatedFilters,
  type UserRelatedFiltersParams,
} from "../get-filters/volunteerFilters";
import {
  getOfferRelatedFilters,
  type OfferRelatedFiltersParams,
} from "../get-filters/offerFilters";

export const filtersKeys = {
  all: () => ["filters"] as const,
  infinite: (params: UserRelatedFiltersParams) =>
    [...filtersKeys.all(), "infinite", params] as const,
  allOffers: () => ["filters-offer"] as const,
  infiniteFilterOffers: (params: OfferRelatedFiltersParams) =>
    [...filtersKeys.allOffers(), "infinite", params] as const,
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
  infiniteFilterOffers: (params: OfferRelatedFiltersParams) =>
    infiniteQueryOptions({
      queryKey: filtersKeys.infiniteFilterOffers(params),
      queryFn: ({ pageParam }) =>
        getOfferRelatedFilters({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.items),
    }),
};
