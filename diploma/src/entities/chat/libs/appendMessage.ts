import { queryClient } from "@shared/api";
import type { Message } from "../model";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import type { MessagesResponse } from "../api/messages-list/messagesListApi";

export const appendMessage = (queryKey: QueryKey, message: Message) => {
  queryClient.setQueriesData<InfiniteData<MessagesResponse>>(
    { queryKey, exact: false },
    (old) => {
      if (!old) return old;

      const pages = old.pages.map((page, i) =>
        i !== old.pages.length - 1
          ? page
          : { ...page, data: [...page.data, message] },
      );

      return { ...old, pages };
    },
  );
};
