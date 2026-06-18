import { Skeleton } from "@heroui/react";
import styles from "./NotificationItem.module.scss";

export const NotificationItemSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.skeletonIcon} />

      <div className={styles.content}>
        <div className={styles.topContent}>
          <Skeleton className={styles.skeletonTitle} />
        </div>
        <Skeleton className={styles.skeletonMessage} />
      </div>

      <Skeleton className={styles.skeletonTime} />
    </div>
  );
};
