import { queryClient } from "@shared/api";
import type { Message } from "../model";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import type { MessagesResponse } from "../api/messages-list/messagesListApi";
import { messageKeys } from "../model/queries/messageQuery";

const firstUnreadByQuery = new Map<string, string>();

export const appendMessage = (
  queryKey: QueryKey,
  message: Message,
  chatId?: string,
  withPagination: boolean = false,
) => {
  const key = JSON.stringify(queryKey);
  const isFirst = withPagination && !firstUnreadByQuery.has(key);

  if (isFirst) {
    firstUnreadByQuery.set(key, message.id);

    if (chatId) {
      queryClient.setQueriesData<MessagesResponse>(
        { queryKey: messageKeys.anchorNoParams(chatId), exact: false },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pagination: {
              ...old.pagination,
              firstUnreadMessageId: message.id,
            },
          };
        },
      );
    }
  }

  queryClient.setQueriesData<InfiniteData<MessagesResponse>>(
    { queryKey, exact: false },
    (old) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page, i) =>
          i !== old.pages.length - 1
            ? page
            : { ...page, data: [...page.data, message] },
        ),
      };
    },
  );
};

export const clearFirstUnread = (queryKey: QueryKey) => {
  firstUnreadByQuery.delete(JSON.stringify(queryKey));
};
