import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useChatScrollStore } from "@entities/chat";
import type { Message } from "@entities/chat";

interface UseMessagesVirtualizerProps {
  messages: Message[];
  chatId: string;
  targetMessageId?: string | null;
}

export const useMessagesVirtualizer = ({
  messages,
  chatId,
  targetMessageId,
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
    const len = messages.length;
    useChatScrollStore.getState().consumeScrollRequest(chatId);
    virtualizer.scrollToIndex(len - 1, { align: "end", behavior: "smooth" });
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

  useLayoutEffect(() => {
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
