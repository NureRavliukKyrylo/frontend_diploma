import type { Chat, RelatedEntityTypeChatValue } from "@entities/chat";
import type { QueryResult } from "@shared/config/types";
import styles from "./ChatsListWidget.module.scss";
import { Fragment, useEffect, useRef } from "react";

interface ChatSectionProps {
  useChatsQuery: (entityType: RelatedEntityTypeChatValue) => QueryResult<Chat>;
  entityType: RelatedEntityTypeChatValue;
  renderCard: (chat: Chat, index: number) => React.ReactNode;
  wrapperClass: string;
}

export const ChatSection = ({
  useChatsQuery,
  entityType,
  renderCard,
  wrapperClass,
}: ChatSectionProps) => {
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

  return (
    <div className={wrapperClass}>
      {chats?.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No chats yet</h2>
          <p>No {entityType} chats available</p>
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
