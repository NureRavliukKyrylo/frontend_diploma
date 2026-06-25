import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { queryClient } from "@shared/api";
import {
  chatKeys,
  messageKeys,
  useChatMessagesQuery,
  type Chat,
  type MessagesResponse,
} from "@entities/chat";
import throttle from "lodash/throttle";
import { useCallback, useMemo, useRef } from "react";
import { readUpTo } from "../api/readUpToApi";

export const useReadMessages = (chatId: string) => {
  const lastReadMessageIdRef = useRef<string | null>(null);
  const { queryKey } = useChatMessagesQuery(chatId);
  const mutation = useMutation({
    mutationFn: ({ messageId }: { messageId: string }) =>
      readUpTo(chatId, messageId),
  });

  const updateUnreadCache = (visibleUnreadIds: string[]) => {
    const decrementBy = visibleUnreadIds.length;
    queryClient.setQueryData<{ data: Chat }>(chatKeys.id(chatId), (old) => {
      if (!old) return old;
      return {
        ...old,
        data: {
          ...old.data,
          unreadCount: Math.max(0, old.data.unreadCount - decrementBy),
        },
      };
    });
    queryClient.setQueriesData<{ pages: { data: Chat[] }[] }>(
      { queryKey: [...chatKeys.all(), "list"], exact: false },
      (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    unreadCount: Math.max(0, chat.unreadCount - decrementBy),
                  }
                : chat,
            ),
          })),
        };
      },
    );
    queryClient.setQueriesData<InfiniteData<MessagesResponse>>(
      { queryKey, exact: false },
      (old) => {
        if (!old) return old;

        const allMessages = old.pages.flatMap((page) => page.data);
        const nextUnread = allMessages.find(
          (msg) =>
            msg.readStatus !== "Read" && !visibleUnreadIds.includes(msg.id),
        );

        queryClient.setQueriesData<MessagesResponse>(
          { queryKey: messageKeys.anchorNoParams(chatId), exact: false },
          (anchorOld) => {
            if (!anchorOld) return anchorOld;
            return {
              ...anchorOld,
              pagination: {
                ...anchorOld.pagination,
                firstUnreadMessageId: nextUnread?.id ?? null,
              },
            };
          },
        );

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((msg) =>
              visibleUnreadIds.includes(msg.id)
                ? { ...msg, readStatus: "Read" }
                : msg,
            ),
          })),
        };
      },
    );
  };

  const throttledRequest = useMemo(
    () =>
      throttle(
        (messageId: string) => {
          mutation.mutate({ messageId });
        },
        3000,
        { leading: false, trailing: true },
      ),
    [chatId],
  );

  const markAsRead = useCallback(
    (messageId: string, visibleUnreadIds: string[]) => {
      if (lastReadMessageIdRef.current === messageId) return;
      lastReadMessageIdRef.current = messageId;

      updateUnreadCache(visibleUnreadIds);

      throttledRequest(messageId);
    },
    [chatId],
  );

  return { markAsRead };
};
