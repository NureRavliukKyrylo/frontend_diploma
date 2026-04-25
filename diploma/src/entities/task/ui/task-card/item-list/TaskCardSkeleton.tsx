import { Skeleton } from "@heroui/skeleton";
import baseStyles from "../base/TaskCardBase.module.scss";
import styles from "./TaskCard.module.scss";

export const TaskCardSkeleton = () => {
  return (
    <div className={styles.taskCardWrapper}>
      <div className={baseStyles.headerTaskBlock}>
        <div className={baseStyles.startSection}>
          <Skeleton className={styles.skeletonOrgLogo} />
          <Skeleton className={styles.skeletonOrgName} />
        </div>

        <div className={baseStyles.taskInfoBlock}>
          <Skeleton className={styles.skeletonTitle} />
          <Skeleton className={styles.skeletonDescLine} />
          <Skeleton className={styles.skeletonDescLineShort} />
        </div>

        <div className={styles.avatarsGroup}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={styles.skeletonAvatar} />
          ))}
        </div>
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
      </div>
    </div>
  );
};
