import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef } from "react";
import {
  messageKeys,
  messageQuery,
  useChatScrollStore,
  useGetMessagesQueryKey,
} from "@entities/chat";
import type { Message, MessagesResponse } from "@entities/chat";
import { queryClient } from "@shared/api";

interface UseMessagesVirtualizerProps {
  messages: Message[];
  chatId: string;
  targetMessageId?: string | null;
  hasNextPage?: boolean;
}

export const useMessagesVirtualizer = ({
  messages,
  chatId,
  targetMessageId,
  hasNextPage,
}: UseMessagesVirtualizerProps) => {
  const messagesWrapperRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => messagesWrapperRef.current,
    estimateSize: () => 90,
    getItemKey: (index) => messages[index]!.id,
    anchorTo: "end",
    overscan: 6,
    gap: 12,
  });

  const prevLengthRef = useRef(messages.length);
  const pendingScrollChatId = useChatScrollStore((s) => s.pendingScrollChatId);
  const setNotAtBottom = useChatScrollStore((s) => s.setNotAtBottom);
  const virtualItems = virtualizer.getVirtualItems();

  const getQueryKey = useGetMessagesQueryKey();

  const fetchLastPage = useCallback(async () => {
    const anchorData = queryClient.getQueriesData<MessagesResponse>({
      queryKey: messageKeys.anchorNoParams(chatId),
      exact: false,
    });
    const lastPage = anchorData?.[0]?.[1]?.pagination.totalPages ?? 1;

    const queryKey = getQueryKey(chatId);

    await queryClient.cancelQueries({ queryKey, exact: false });

    const lastPageData = await queryClient.fetchInfiniteQuery(
      messageQuery.list(chatId, { pageSize: 40, page: lastPage }),
    );

    queryClient.setQueriesData(
      { queryKey, exact: false },
      {
        pages: [lastPageData.pages[0]],
        pageParams: [lastPage],
      },
    );
  }, [chatId, getQueryKey]);

  const prefetchLastPage = useCallback(async () => {
    const anchorData = queryClient.getQueriesData<MessagesResponse>({
      queryKey: messageKeys.anchorNoParams(chatId),
      exact: false,
    });
    const lastPage = anchorData?.[0]?.[1]?.pagination.totalPages ?? 1;

    await queryClient.prefetchInfiniteQuery(
      messageQuery.list(chatId, { pageSize: 40, page: lastPage }),
    );
  }, [chatId]);

  useEffect(() => {
    if (hasNextPage) {
      prefetchLastPage();
    }
  }, [chatId, hasNextPage]);

  useEffect(() => {
    const len = messages.length;
    if (len > prevLengthRef.current) {
      const shouldScroll = useChatScrollStore
        .getState()
        .consumeScrollRequest(chatId);
      if (shouldScroll) {
        virtualizer.scrollToIndex(len - 1, {
          align: "end",
          behavior: "smooth",
        });
      }
    }
    prevLengthRef.current = len;
  }, [messages.length]);

  useEffect(() => {
    if (!pendingScrollChatId || pendingScrollChatId !== chatId) return;
    useChatScrollStore.getState().consumeScrollRequest(chatId);

    if (hasNextPage) {
      fetchLastPage().then(() => {
        virtualizer.scrollToIndex(messages.length - 1, {
          align: "end",
          behavior: "smooth",
        });
      });
      return;
    }

    virtualizer.scrollToIndex(messages.length - 1, {
      align: "end",
      behavior: "smooth",
    });
  }, [pendingScrollChatId]);

  useEffect(() => {
    const el = messagesWrapperRef.current;
    if (!el) return;

    const check = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setNotAtBottom(chatId, distanceFromBottom > 50);
    };

    check();

    el.addEventListener("scroll", check, { passive: true });
    return () => el.removeEventListener("scroll", check);
  }, [chatId, virtualItems.length]);

  useEffect(() => {
    const targetIndex = targetMessageId
      ? (messages.findIndex((m) => m.id === targetMessageId) ?? -1)
      : -1;

    if (targetIndex !== -1) {
      virtualizer.scrollToIndex(targetIndex, { align: "start" });
    } else {
      virtualizer.scrollToEnd();
    }
  }, [chatId, virtualizer]);

  return {
    messagesWrapperRef,
    virtualizer,
    virtualItems,
  };
};
