import styles from "./MessagesListWidget.module.scss";
import type { QueryResult } from "@shared/config/types";
import { type Message } from "@entities/chat";
import { useReadMessages } from "@features/chat";
import { useMessagesVirtualizer } from "../model/useMessagesVirtualizer";
import { useMessagesInfiniteScroll } from "../model/useMessagesInfiniteScroll";
import { useMessageReadObserver } from "../model/useMessageReadObserver";
import { useTranslation } from "react-i18next";

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
  const messages = readyMessages ?? queryResult?.data ?? [];
  const { t } = useTranslation("chat");
  const { messagesWrapperRef, virtualizer, virtualItems } =
    useMessagesVirtualizer({
      messages,
      chatId,
      targetMessageId: queryResult?.targetMessageId,
    });

  useMessagesInfiniteScroll({
    virtualItems,
    messagesLength: messages.length,
    hasNextPage: queryResult?.hasNextPage ?? false,
    isFetchingNextPage: queryResult?.isFetchingNextPage ?? false,
    fetchNextPage: queryResult?.fetchNextPage ?? (() => {}),
    hasPreviousPage: queryResult?.hasPreviousPage ?? false,
    isFetchingPreviousPage: queryResult?.isFetchingPreviousPage ?? false,
    fetchPreviousPage: queryResult?.fetchPreviousPage ?? (() => {}),
    messagesWrapperRef,
  });

  const { markAsRead } = useReadMessages(chatId);

  useMessageReadObserver({
    messages,
    chatId,
    virtualItems,
    messagesWrapperRef,
    markAsRead,
  });

  const wrapperClass =
    `${styles.categoriesWidgetBlock} ${className ?? ""}`.trim();

  return (
    <div className={wrapperClass} ref={messagesWrapperRef}>
      {messages.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>{t("chat:states.empty.title")}</h2>
          <p>{t("chat:states.empty.subtitle")}</p>
        </div>
      ) : (
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
            width: "100%",
          }}
        >
          {virtualItems.map((virtualRow) => {
            const message = messages[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                data-message-id={message.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {renderCard(message, virtualRow.index)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
