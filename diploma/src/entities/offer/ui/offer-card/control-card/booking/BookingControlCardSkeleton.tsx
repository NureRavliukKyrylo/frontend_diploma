import { Skeleton } from "@heroui/react";
import styles from "./BookingControlCard.module.scss";

export const BookingControlCardSkeleton = () => {
  return (
    <div className={styles.bookingWrapper}>
      <Skeleton className={styles.skeletonAvatar} />

      <div className={styles.mainContent}>
        <div className={styles.topRow}>
          <Skeleton className={styles.skeletonTitle} />
        </div>
        <div className={styles.metaRow}>
          <Skeleton className={styles.skeletonMeta} />
          <Skeleton className={styles.skeletonOnlineStatus} />
        </div>
      </div>

      <div className={styles.rightContent}>
        <Skeleton className={styles.skeletonStatus} />
        <Skeleton className={styles.skeletonReward} />
      </div>
    </div>
  );
};
