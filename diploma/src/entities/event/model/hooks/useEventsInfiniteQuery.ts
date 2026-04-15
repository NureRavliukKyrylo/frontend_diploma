import { useInfiniteQuery } from "@tanstack/react-query";
import { eventQuery } from "../queries/eventQuery";
import type { QueryResult } from "@shared/config/types";
import type { Event } from "../types/Event";
import type { EventPaginationParams } from "@entities/event/libs";

export const useEventsInfiniteQuery =
  (params: EventPaginationParams) => (): QueryResult<Event> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useInfiniteQuery(eventQuery.infinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };
