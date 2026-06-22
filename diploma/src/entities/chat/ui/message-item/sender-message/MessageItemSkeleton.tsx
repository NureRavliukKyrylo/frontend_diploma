import { Skeleton } from "@heroui/react";
import styles from "./MessageItem.module.scss";

interface MessageItemSkeletonProps {
  isMine?: boolean;
}

export const MessageItemSkeleton = ({
  isMine = false,
}: MessageItemSkeletonProps) => {
  return (
    <div
      className={`${styles.messageWrapper} ${isMine ? styles.mine : ""} ${styles.skeletonWrapper}`}
    >
      {!isMine && <Skeleton className={styles.avatarSk} />}
      <div className={styles.bubbleSk}>
        {!isMine && <Skeleton className={styles.nameSk} />}
        <Skeleton className={styles.messageSk} />
        <Skeleton className={`${styles.messageSk} ${styles.messageShortSk}`} />
        <Skeleton className={styles.timestampSk} />
      </div>
    </div>
  );
};
