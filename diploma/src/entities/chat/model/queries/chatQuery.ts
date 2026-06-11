import { getListChats } from "@entities/chat/api";
import type { ChatSearchQuery } from "../../libs";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const chatKeys = {
  all: () => ["chats"] as const,
  list: (params: ChatSearchQuery) => [...chatKeys.all(), "list", params],
};

export const chatQuery = {
  list: (params: ChatSearchQuery) =>
    infiniteQueryOptions({
      queryKey: chatKeys.list(params),
      queryFn: ({ pageParam }) => getListChats({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};
