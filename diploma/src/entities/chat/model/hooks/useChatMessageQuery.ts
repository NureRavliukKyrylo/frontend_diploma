import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { messageQuery } from "../queries/messageQuery";
import type { QueryResult } from "@shared/config/types";
import type { Message } from "../types/Message";
import { queryClient } from "@shared/api";

export const useChatMessagesQuery = (chatId: string) => {
  const hook = (): QueryResult<Message> => {
    const { data: anchorPage } = useSuspenseQuery(
      messageQuery.anchor(chatId, { pageSize: 40 }),
    );
    const page =
      anchorPage?.pagination.firstUnreadPage ??
      anchorPage?.pagination.totalPages;
    const queryOptions = messageQuery.list(chatId, { pageSize: 40, page });

    const result = useSuspenseInfiniteQuery(queryOptions);
    const messages = result.data ?? [];

    if (messages.length < 15 && result.hasPreviousPage) {
      if (!result.isFetchingPreviousPage) {
        result.fetchPreviousPage();
      }
      throw new Promise<void>((resolve) => {
        const unsub = queryClient.getQueryCache().subscribe((event) => {
          if (
            event.type === "updated" &&
            queryClient
              .getQueryCache()
              .find({ queryKey: queryOptions.queryKey })?.queryHash ===
              event.query.queryHash
          ) {
            unsub();
            resolve();
          }
        });
      });
    }

    return {
      ...result,
      targetMessageId: anchorPage?.pagination.firstUnreadMessageId,
      queryKey: queryOptions.queryKey,
    };
  };

  const baseQueryKey = messageQuery.list(chatId, { pageSize: 40 }).queryKey;

  return { hook, queryKey: baseQueryKey };
};
