import { useInfiniteQuery } from "@tanstack/react-query";
import { filtersQuery } from "../queries/filtersQuery";
import type {
  UserRelatedFilterItem,
  UserRelatedFiltersParams,
} from "../get-filters/volunteerFilters";
import type { QueryResult } from "@shared/config/types";

export const useFiltersInfiniteQuery =
  (params: UserRelatedFiltersParams) =>
  (): QueryResult<UserRelatedFilterItem> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useInfiniteQuery(filtersQuery.infinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };
