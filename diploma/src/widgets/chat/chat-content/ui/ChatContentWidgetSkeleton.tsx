import { Skeleton } from "@heroui/react";
import styles from "./ChatContentWidget.module.scss";
import { MessagesListSkeleton } from "@widgets/chat/messages-list/ui/MessagesListSkeleton";

export const ChatContentWidgetSkeleton = () => {
  return (
    <div className={styles.chatContentWrapper}>
      <div className={styles.chatHeader}>
        <div className={styles.avatarBack}>
          <Skeleton className={styles.avatarSk} />
        </div>
        <div className={styles.chatInfo}>
          <Skeleton className={styles.nameSk} />
          <div className={styles.chatMetaRow}>
            <Skeleton className={styles.chipSk} />
            <Skeleton className={styles.membersSk} />
          </div>
        </div>
        <Skeleton className={styles.detailsButtonSk} />
      </div>

      <div className={styles.chatBody}>
        <MessagesListSkeleton className={styles.wrapperMessagesSkeleton} />
      </div>
      <div className={styles.formAreaSk}>
        <Skeleton className={styles.formInputSk} />
        <Skeleton className={styles.formButtonSk} />
      </div>
    </div>
  );
};
