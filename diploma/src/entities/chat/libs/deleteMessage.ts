import { queryClient } from "@shared/api";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import type { MessagesResponse } from "../api/messages-list/messagesListApi";

export const deleteMessage = (queryKey: QueryKey, messageId: string) => {
  queryClient.setQueriesData<InfiniteData<MessagesResponse>>(
    { queryKey, exact: false },
    (old) => {
      if (!old) return old;

      const pages = old.pages.map((page) => ({
        ...page,
        data: page.data.filter((msg) => msg.id !== messageId),
      }));

      return { ...old, pages };
    },
  );
};
