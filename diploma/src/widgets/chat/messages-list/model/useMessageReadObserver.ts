import { useEffect, useRef } from "react";
import type { VirtualItem } from "@tanstack/react-virtual";
import type { Message } from "@entities/chat";

interface UseMessageReadObserverProps {
  messages: Message[];
  chatId: string;
  virtualItems: VirtualItem[];
  messagesWrapperRef: React.RefObject<HTMLDivElement | null>;
  markAsRead: (messageId: string) => void;
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

        const lastVisibleId = visibleEntries.reverse().find((id) => {
          const message = messages.find((m) => m.id === id);
          return message && !message.isMine;
        });

        if (
          lastVisibleId &&
          lastVisibleId !== lastVisibleMessageIdRef.current
        ) {
          lastVisibleMessageIdRef.current = lastVisibleId;
          markAsRead(lastVisibleId);
        }
      },
      { root: scrollEl, threshold: 0.5 },
    );

    const messageEls = scrollEl.querySelectorAll("[data-message-id]");
    messageEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [virtualItems, messages.length]);
};
