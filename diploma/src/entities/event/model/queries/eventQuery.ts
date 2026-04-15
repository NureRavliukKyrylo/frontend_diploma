import type { EventPaginationParams, EventSearchParams } from "../../libs";
import { getListEvents, getMyEvents, getEventId } from "../../api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const eventKeys = {
  all: () => ["events"] as const,
  list: (params: EventSearchParams) =>
    [...eventKeys.all(), "list", params] as const,
  id: (id: string) => [...eventKeys.all(), "id", id] as const,
  mys: () => [...eventKeys.all(), "my"] as const,
  my: (params: EventSearchParams) => [...eventKeys.mys(), params] as const,
  infinite: (params: EventPaginationParams) =>
    [...eventKeys.list(params), "infinite"] as const,
};

export const eventQuery = {
  list: (params: EventSearchParams) =>
    queryOptions({
      queryKey: eventKeys.list({ ...params }),
      queryFn: () => getListEvents({ ...params }),
      placeholderData: (prev) => prev,
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: eventKeys.id(id),
      queryFn: () => getEventId(id),
      select: (res) => res.data,
    }),
  my: (params: EventSearchParams) =>
    queryOptions({
      queryKey: eventKeys.my({ ...params }),
      queryFn: () => getMyEvents({ ...params }),
      placeholderData: (prev) => prev,
    }),
  infinite: (params: EventPaginationParams) =>
    infiniteQueryOptions({
      queryKey: eventKeys.infinite(params),
      queryFn: ({ pageParam }) => getListEvents({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};
