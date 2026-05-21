import { Skeleton } from "@heroui/skeleton";
import baseStyles from "../base/TaskCardBase.module.scss";
import styles from "./TaskControlCard.module.scss";

export const TaskControlCardSkeleton = () => {
  return (
    <div className={styles.taskControlCardWrapper}>
      <div className={baseStyles.headerTaskBlock}>
        <div className={baseStyles.startSection}>
          <Skeleton className={styles.skeletonOrgLogo} />
          <Skeleton className={styles.skeletonOrgName} />
          <Skeleton className={styles.skeletonStatusBadge} />
        </div>
        <div className={baseStyles.taskInfoBlock}>
          <Skeleton className={styles.skeletonTitle} />
          <Skeleton className={styles.skeletonDescLine} />
          <Skeleton className={styles.skeletonDescLineShort} />
        </div>
      </div>

      <div className={baseStyles.middleSection}>
        <Skeleton className={styles.skeletonActionsIcon} />
      </div>

      <div className={baseStyles.endSection}>
        <div className={baseStyles.deadlineBlock}>
          <div className={baseStyles.deadlineInner}>
            <Skeleton className={styles.skeletonCalendarIcon} />
            <div className={baseStyles.deadlineTextInfo}>
              <Skeleton className={styles.skeletonDeadlineLabel} />
              <Skeleton className={styles.skeletonDeadlineDate} />
            </div>
          </div>
        </div>
        <Skeleton className={styles.skeletonGetStartedButton} />
      </div>
    </div>
  );
};
