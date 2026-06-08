import { useInfiniteQuery } from "@tanstack/react-query";
import { filtersQuery } from "../queries/filtersQuery";
import type { QueryResult } from "@shared/config/types";
import type {
  OfferRelatedFilterItem,
  OfferRelatedFiltersParams,
} from "../get-filters/offerFilters";

export const useOffersFiltersInfiniteQuery =
  (params: OfferRelatedFiltersParams) =>
  (): QueryResult<OfferRelatedFilterItem> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useInfiniteQuery(filtersQuery.infiniteFilterOffers(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };
