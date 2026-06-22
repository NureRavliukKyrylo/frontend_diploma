import { queryClient } from "@shared/api";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import type { Message } from "../model";
import type { MessagesResponse } from "../api/messages-list/messagesListApi";

export const updateMessage = (queryKey: QueryKey, updatedMessage: Message) => {
  queryClient.setQueriesData<InfiniteData<MessagesResponse>>(
    { queryKey, exact: false },
    (old) => {
      if (!old) return old;

      const pages = old.pages.map((page) => ({
        ...page,
        data: page.data.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg,
        ),
      }));

      return { ...old, pages };
    },
  );
};
