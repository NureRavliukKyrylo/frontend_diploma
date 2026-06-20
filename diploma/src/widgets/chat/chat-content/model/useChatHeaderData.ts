import { useSuspenseQuery, type InfiniteData } from "@tanstack/react-query";
import { chatKeys, chatQuery, type Chat } from "@entities/chat";
import { queryClient } from "@shared/api";

interface ChatListPage {
  data: Chat[];
  pagination: { nextPage?: number };
}

export const useChatHeaderData = (chatId: string) => {
  return useSuspenseQuery({
    ...chatQuery.chat(chatId),
    initialData: () => {
      const cachedLists = queryClient.getQueriesData<
        InfiniteData<ChatListPage>
      >({
        queryKey: chatKeys.all(),
      });

      for (const [, data] of cachedLists) {
        const found = data?.pages
          ?.flatMap((page) => page.data)
          .find((chat) => chat.id === chatId);
        if (found) return { data: found };
      }

      return undefined;
    },
  });
};
