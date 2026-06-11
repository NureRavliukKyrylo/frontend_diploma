import { getListMessages } from "@entities/chat/api";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const messageKeys = {
  all: () => ["messages"] as const,
  list: (chatId: string) => [...messageKeys.all(), "list", chatId] as const,
  listParams: (chatId: string, params: { page?: number; pageSize: number }) => [
    ...messageKeys.list(chatId),
    params,
  ],
};

export const messageQuery = {
  list: (chatId: string, params: { page?: number; pageSize: number }) =>
    infiniteQueryOptions({
      queryKey: messageKeys.listParams(chatId, params),
      queryFn: ({ pageParam }) =>
        getListMessages(chatId, { ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};
