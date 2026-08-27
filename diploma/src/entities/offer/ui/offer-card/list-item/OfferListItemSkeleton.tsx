import { Skeleton } from "@heroui/react";
import styles from "./OfferListItem.module.scss";

export const OfferListItemSkeleton = () => {
  return (
    <div className={styles.offerWrapper}>
      <div className={styles.topContent}>
        <div className={styles.ownerContent}>
          <Skeleton className={styles.skeletonAvatar} />
          <div className={styles.initials}>
            <Skeleton className={styles.skeletonOwnerName} />
            <Skeleton className={styles.skeletonStatus} />
          </div>
        </div>
        <div className={styles.reward}>
          <Skeleton className={styles.skeletonRewardValue} />
          <Skeleton className={styles.skeletonRewardLabel} />
        </div>
      </div>

      <Skeleton className={styles.skeletonTitle} />

      <div className={styles.description}>
        <Skeleton className={styles.skeletonDescLine} />
        <Skeleton className={styles.skeletonDescLineShort} />
      </div>

      <div className={styles.deadlineBlock}>
        <Skeleton className={styles.skeletonIcon} />
        <Skeleton className={styles.skeletonDeadlineText} />
      </div>

      <div className={styles.dividerLine} />

      <Skeleton className={styles.skeletonTakeButton} />
    </div>
  );
};
