import { useEffect, useRef } from "react";
import type { VirtualItem } from "@tanstack/react-virtual";
import type { Message } from "@entities/chat";

interface UseMessageReadObserverProps {
  messages: Message[];
  chatId: string;
  virtualItems: VirtualItem[];
  messagesWrapperRef: React.RefObject<HTMLDivElement | null>;
  markAsRead: (messageId: string, visibleUnreadIds: string[]) => void;
}

export const useMessageReadObserver = ({
  messages,
  virtualItems,
  messagesWrapperRef,
  markAsRead,
}: UseMessageReadObserverProps) => {
  const lastVisibleMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!messages.length) return;

    const scrollEl = messagesWrapperRef.current;
    if (!scrollEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target.getAttribute("data-message-id"))
          .filter(Boolean) as string[];

        if (!visibleEntries.length) return;

        const lastVisibleUnreadId = visibleEntries.reverse().find((id) => {
          const message = messages.find((m) => m.id === id);
          return message && !message.isMine && message.readStatus !== "Read";
        });

        if (
          !lastVisibleUnreadId ||
          lastVisibleUnreadId === lastVisibleMessageIdRef.current
        )
          return;

        const lastVisibleIndex = messages.findIndex(
          (m) => m.id === lastVisibleUnreadId,
        );

        const allUnreadUpTo = messages
          .slice(0, lastVisibleIndex + 1)
          .filter((m) => !m.isMine && m.readStatus !== "Read")
          .map((m) => m.id);

        if (!allUnreadUpTo.length) return;

        lastVisibleMessageIdRef.current = lastVisibleUnreadId;
        markAsRead(lastVisibleUnreadId, allUnreadUpTo);
      },
      { root: scrollEl, threshold: 0.5 },
    );

    const messageEls = scrollEl.querySelectorAll("[data-message-id]");
    messageEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [virtualItems, messages.length]);
};
