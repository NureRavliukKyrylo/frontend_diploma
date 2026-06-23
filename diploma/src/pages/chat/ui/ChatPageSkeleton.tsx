import { ChatItemSkeleton } from "@entities/chat";
import { MessagesListSkeleton } from "@widgets/chat";
import styles from "./ChatPage.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { Skeleton } from "@heroui/react";

export const ChatPageSkeleton = () => {
  return (
    <div className={styles.chatPageWrapper}>
      <div className={styles.chatsListWrapper}>
        <Skeleton className={styles.headerSkeleton} />
        <ListWidgetSkeleton
          renderSkeleton={() => <ChatItemSkeleton />}
          items={12}
        />
      </div>
      <div className={styles.chatWrapper}>
        <Skeleton className={styles.chatHeaderSkeleton} />
        <MessagesListSkeleton className={styles.wrapperMessagesSkeleton} />
      </div>
    </div>
  );
};
