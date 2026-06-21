import styles from "./MessagesListWidget.module.scss";
import type { QueryResult } from "@shared/config/types";
import { useChatScrollStore, type Message } from "@entities/chat";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useLayoutEffect, useRef } from "react";

interface MessagesListWidgetProps {
  useMessagesQuery?: () => QueryResult<Message>;
  renderCard: (message: Message, index: number) => React.ReactNode;
  chatId: string;
  messages?: Message[];
  className?: string;
}

export const MessagesListWidget = ({
  useMessagesQuery,
  renderCard,
  className,
  chatId,
  messages: readyMessages,
}: MessagesListWidgetProps) => {
  const queryResult = useMessagesQuery?.();
  const messages = readyMessages ?? queryResult?.data;
  const hasNextPage = queryResult?.hasNextPage ?? false;
  const isFetchingNextPage = queryResult?.isFetchingNextPage ?? false;
  const fetchNextPage = queryResult?.fetchNextPage ?? (() => {});

  const hasPreviousPage = queryResult?.hasPreviousPage ?? false;
  const isFetchingPreviousPage = queryResult?.isFetchingPreviousPage ?? false;
  const fetchPreviousPage = queryResult?.fetchPreviousPage ?? (() => {});

  const targetMessageId = queryResult?.targetMessageId;
  const messagesWrapperRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: messages?.length ?? 0,
    getScrollElement: () => messagesWrapperRef.current,
    estimateSize: () => 90,
    getItemKey: (index) => messages![index]!.id,
    anchorTo: "end",
    overscan: 6,
    gap: 12,
    directDomUpdates: true,
  });

  const wrapperClass =
    `${styles.categoriesWidgetBlock} ${className ?? ""}`.trim();

  const virtualItems = virtualizer.getVirtualItems();

  const prevLengthRef = useRef(messages?.length ?? 0);

  useEffect(() => {
    const len = messages?.length ?? 0;

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
  }, [messages?.length]);

  useLayoutEffect(() => {
    const targetIndex = targetMessageId
      ? (messages?.findIndex((m) => m.id === targetMessageId) ?? -1)
      : -1;

    if (targetIndex !== -1) {
      virtualizer.scrollToIndex(targetIndex, { align: "start" });
    } else {
      virtualizer.scrollToEnd();
    }
  }, [chatId, virtualizer]);

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= (messages?.length ?? 0) - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    messages?.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  useEffect(() => {
    const [firstItem] = virtualItems;

    if (!firstItem) return;

    if (firstItem.index <= 0 && hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  }, [
    hasPreviousPage,
    fetchPreviousPage,
    messages?.length,
    isFetchingPreviousPage,
    virtualItems,
  ]);

  return (
    <div className={wrapperClass} ref={messagesWrapperRef}>
      <div
        ref={virtualizer.containerRef}
        style={{ position: "relative", width: "100%" }}
      >
        {virtualItems.map((virtualRow) => {
          const message = messages![virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
              }}
            >
              {renderCard(message, virtualRow.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
