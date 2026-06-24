import { useSignalREvent } from "@shared/libs/hooks";
import { useCallback } from "react";
import { queryClient } from "@shared/api";
import { chatKeys } from "../queries/chatQuery";
import type { Chat } from "../types/Chat";

interface ChatChangedPayload {
  chatId: string;
  unreadCount: number;
  mentionCount: number;
  lastMessage: { message: string; timestamp: string } | null;
  isTyping: boolean;
  typingUsers: unknown[];
  updatedAt: string;
}

export function useChatChangedEvent() {
  useSignalREvent(
    "chats",
    "chat.changed",
    useCallback(
      (payload: ChatChangedPayload) => {
        queryClient.setQueriesData<{ pages: { data: Chat[] }[] }>(
          { queryKey: [...chatKeys.all(), "list"] },
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                data: page.data.map((chat) =>
                  chat.id === payload.chatId
                    ? {
                        ...chat,
                        unreadCount: payload.unreadCount,
                        mentionCount: payload.mentionCount,
                        lastMessage: payload.lastMessage,
                        updatedAt: payload.updatedAt,
                      }
                    : chat,
                ),
              })),
            };
          },
        );
        queryClient.setQueryData<{ data: Chat }>(
          chatKeys.id(payload.chatId),
          (old) => {
            if (!old) return old;
            return {
              ...old,
              data: {
                ...old.data,
                unreadCount: payload.unreadCount,
                mentionCount: payload.mentionCount,
                lastMessage: payload.lastMessage,
                updatedAt: payload.updatedAt,
              },
            };
          },
        );
      },
      [queryClient],
    ),
  );
}
