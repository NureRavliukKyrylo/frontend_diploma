import { Skeleton } from "@heroui/react";
import styles from "./BookingListItem.module.scss";

export const BookingListItemSkeleton = () => {
  return (
    <div className={styles.bookingWrapper}>
      <Skeleton className={styles.skeletonAvatar} />
      <div className={styles.bodyWrapper}>
        <div className={styles.initials}>
          <Skeleton className={styles.skeletonName} />
          <Skeleton className={styles.skeletonStatus} />
        </div>
        <Skeleton className={styles.skeletonComment} />
        <Skeleton className={styles.skeletonCommentShort} />
      </div>
      <Skeleton className={styles.skeletonTime} />
    </div>
  );
};
