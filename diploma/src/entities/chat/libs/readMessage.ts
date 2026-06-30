import { queryClient } from "@shared/api";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import type { MessagesResponse } from "../api/messages-list/messagesListApi";

export const readMessage = (queryKey: QueryKey, messageId: string) => {
  queryClient.setQueriesData<InfiniteData<MessagesResponse>>(
    { queryKey, exact: false },
    (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page) => {
          const targetIndex = page.data.findIndex(
            (msg) => msg.id === messageId,
          );
          if (targetIndex === -1) return page;

          return {
            ...page,
            data: page.data.map((msg, index) =>
              index <= targetIndex ? { ...msg, readStatus: "Read" } : msg,
            ),
          };
        }),
      };
    },
  );
};
