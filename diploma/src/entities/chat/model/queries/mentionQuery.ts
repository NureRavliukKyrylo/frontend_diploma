import {
  getMentionsFeed,
  searchMentionsInChat,
} from "@entities/chat/api";
import { queryOptions } from "@tanstack/react-query";

export const mentionKeys = {
  all: () => ["chat-mentions"] as const,
  feed: () => [...mentionKeys.all(), "feed"] as const,
  forChat: (chatId: string) => [...mentionKeys.feed(), chatId] as const,
  search: (chatId: string) => [...mentionKeys.all(), "search", chatId] as const,
};

export const mentionQuery = {
  feed: () =>
    queryOptions({
      queryKey: mentionKeys.feed(),
      queryFn: () => getMentionsFeed(),
      staleTime: 30_000,
    }),
  forChat: (chatId: string) =>
    queryOptions({
      queryKey: mentionKeys.forChat(chatId),
      queryFn: () => getMentionsFeed({ chatId, pageSize: 50 }),
      enabled: Boolean(chatId),
      staleTime: 30_000,
    }),
  search: (chatId: string) =>
    queryOptions({
      queryKey: mentionKeys.search(chatId),
      queryFn: () => searchMentionsInChat(chatId),
      enabled: Boolean(chatId),
      staleTime: 30_000,
    }),
};
