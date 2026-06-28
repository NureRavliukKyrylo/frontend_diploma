import type { Chat, RelatedEntityTypeChatValue } from "@entities/chat";
import type { QueryResult } from "@shared/config/types";
import styles from "./ChatsListWidget.module.scss";
import { Fragment, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface ChatSectionProps {
  useChatsQuery: (entityType: RelatedEntityTypeChatValue) => QueryResult<Chat>;
  entityType: RelatedEntityTypeChatValue;
  renderCard: (chat: Chat, index: number) => React.ReactNode;
  wrapperClass: string;
  onCountChange?: (entityType: RelatedEntityTypeChatValue, count: number) => void;
}

export const ChatSection = ({
  useChatsQuery,
  entityType,
  renderCard,
  wrapperClass,
  onCountChange,
}: ChatSectionProps) => {
  const { t } = useTranslation(["chat"]);
  const {
    data: chats,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useChatsQuery(entityType);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage?.();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const midIndex = Math.floor((chats?.length ?? 0) / 2);

  const translatedCategory = t(`chat:categories.${entityType}`, {
    defaultValue: entityType,
  });

  useEffect(() => {
    onCountChange?.(entityType, chats?.length ?? 0);
  }, [chats?.length, entityType, onCountChange]);

  return (
    <div className={wrapperClass}>
      {chats?.length === 0 ? (
        <div className={styles.activeEmptyState}>
          <h2 className={styles.activeEmptyTitle}>
            {t("chat:states.emptyTitle")}
          </h2>
          <p className={styles.activeEmptySubtitle}>
            {t("chat:states.emptyDescription", { type: translatedCategory })}
          </p>
        </div>
      ) : (
        chats?.map((chat, index) => (
          <Fragment key={chat.id}>
            {index === midIndex && <div ref={observerRef} />}
            {renderCard(chat, index)}
          </Fragment>
        ))
      )}
    </div>
  );
};
