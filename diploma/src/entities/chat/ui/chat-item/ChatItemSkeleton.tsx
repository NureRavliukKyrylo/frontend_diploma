import { Skeleton } from "@heroui/skeleton";
import styles from "./ChatItem.module.scss";

export const ChatItemSkeleton = () => {
  return (
    <div className={styles.skeletonChatWrapper}>
      <Skeleton className={styles.skeletonAvatar} />
      <div className={styles.rightContent}>
        <div className={styles.topContent}>
          <Skeleton className={styles.skeletonName} />
          <Skeleton className={styles.skeletonTime} />
        </div>
        <div className={styles.bottomContent}>
          <Skeleton className={styles.skeletonMessage} />
        </div>
      </div>
    </div>
  );
};
