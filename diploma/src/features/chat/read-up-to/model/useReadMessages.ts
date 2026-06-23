import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/api";
import { chatQuery, type Chat } from "@entities/chat";
import throttle from "lodash/throttle";
import { useCallback, useRef } from "react";
import { readUpTo } from "../api/readUpToApi";

export const useReadMessages = (chatId: string) => {
  const lastReadMessageIdRef = useRef<string | null>(null);

  const mutation = useMutation({
    mutationFn: ({ messageId }: { messageId: string }) =>
      readUpTo(chatId, messageId),
  });

  const updateUnreadCache = () => {
    queryClient.setQueryData(
      chatQuery.chat(chatId).queryKey,
      (old: { data: Chat } | undefined) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, unreadCount: 0 },
        };
      },
    );
  };

  const throttledRequest = useCallback(
    throttle((messageId: string) => {
      mutation.mutate({ messageId });
    }, 3000),
    [chatId],
  );

  const markAsRead = useCallback(
    (messageId: string) => {
      if (lastReadMessageIdRef.current === messageId) return;
      lastReadMessageIdRef.current = messageId;

      updateUnreadCache();

      throttledRequest(messageId);
    },
    [chatId],
  );

  return { markAsRead };
};
