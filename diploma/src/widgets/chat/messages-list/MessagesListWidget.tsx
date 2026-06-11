import styles from "./MessagesListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { QueryResult } from "@shared/config/types";
import type { Message } from "@entities/chat";

interface MessagesListWidgetProps {
  useMessagesQuery?: () => QueryResult<Message>;
  renderCard: (message: Message, index: number) => React.ReactNode;
  startSlot?: React.ReactNode;
  messages?: Message[];
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const MessagesListWidget = ({
  useMessagesQuery,
  renderCard,
  startSlot,
  renderSkeleton,
  skeletonItems,
  className,
  messages: readyMessages,
}: MessagesListWidgetProps) => {
  const queryResult = useMessagesQuery?.();
  const messages = readyMessages ?? queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

  const wrapperClass =
    `${styles.categoriesWidgetBlock} ${className ?? ""}`.trim();

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        items={skeletonItems}
        className={className}
        renderSkeleton={renderSkeleton}
      />
    );
  }

  return (
    <div className={wrapperClass}>
      {startSlot}
      {messages?.map((message, index) => renderCard(message, index))}
    </div>
  );
};
