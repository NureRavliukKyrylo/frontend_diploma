import { Skeleton } from "@heroui/react";
import baseStyles from "../base/FeedbackBase.module.scss";
import styles from "./FeedbackCard.module.scss";

export const FeedbackCardSkeleton = () => {
  return (
    <div className={styles.feedbackWrapper}>
      <div className={baseStyles.memberInfo}>
        <Skeleton className={styles.skeletonAvatar} />
        <div className={baseStyles.initialsMember}>
          <Skeleton className={styles.skeletonName} />
          <Skeleton className={styles.skeletonRole} />
        </div>
      </div>

      <div className={baseStyles.feedbackInfo}>
        <div className={baseStyles.ratingAndDate}>
          <Skeleton className={styles.skeletonStars} />
          <Skeleton className={styles.skeletonDate} />
        </div>
        <Skeleton className={styles.skeletonComment} />
      </div>
    </div>
  );
};
