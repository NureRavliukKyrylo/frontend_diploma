import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { QueryResult } from "@shared/config/types";
import type { Badge } from "../types";
import type { MyBadgesSearchParams } from "../../api";
import { badgesQuery } from "../queries/badgesQuery";

export const useMyBadgesInfiniteQuery =
  (params: MyBadgesSearchParams) => (): QueryResult<Badge> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useSuspenseInfiniteQuery(badgesQuery.infiniteMy(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };
