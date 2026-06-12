import { getListMessages } from "@entities/chat/api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const messageKeys = {
  all: () => ["messages"] as const,
  list: (chatId: string) => [...messageKeys.all(), "list", chatId] as const,
  listParams: (chatId: string, params: { page?: number; pageSize: number }) => [
    ...messageKeys.list(chatId),
    params,
  ],
  anchor: (chatId: string, params: { pageSize: number }) =>
    [...messageKeys.list(chatId), "anchor", params] as const,
};

export const messageQuery = {
  list: (chatId: string, params: { pageSize: number; page?: number }) =>
    infiniteQueryOptions({
      queryKey: messageKeys.listParams(chatId, params),
      queryFn: ({ pageParam }) =>
        getListMessages(chatId, { pageSize: params.pageSize, page: pageParam }),
      initialPageParam: params.page ?? 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      getPreviousPageParam: (firstPage) =>
        firstPage.pagination.previousPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),

  anchor: (chatId: string, params: { pageSize: number }) =>
    queryOptions({
      queryKey: messageKeys.anchor(chatId, params),
      queryFn: () => getListMessages(chatId, { pageSize: params.pageSize }),
    }),
};
