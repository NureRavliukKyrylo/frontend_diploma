import { useInfiniteQuery } from "@tanstack/react-query";
import { filtersQuery } from "../queries/filtersQuery";
import type { UserRelatedFiltersParams } from "../get-filters/volunteerFilters";
import type { QueryResult } from "@shared/config/types";

interface FilterItem {
  id: string;
  name: string;
}

export const useFiltersInfiniteQuery =
  (params: UserRelatedFiltersParams) => (): QueryResult<FilterItem> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery(filtersQuery.infinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
  };
