import { Skeleton } from "@heroui/skeleton";
import styles from "./TaskBoardItem.module.scss";

export const TaskBoardItemSkeleton = () => (
  <div className={styles.taskBoardItemWrapper}>
    <Skeleton className={styles.skeletonTitle} />
    <Skeleton className={styles.skeletonDescLine} />
    <Skeleton className={styles.skeletonDescLineShort} />

    <div className={styles.deadlineBlock}>
      <Skeleton className={styles.skeletonCalendarIcon} />
      <Skeleton className={styles.skeletonDeadlineDate} />
    </div>

    <div className={styles.dividerLine} />

    <div className={styles.footerContent}>
      <div className={styles.avatarsGroup}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className={styles.skeletonAvatar} />
        ))}
      </div>
      <Skeleton className={styles.skeletonFeedbackBadge} />
    </div>
  </div>
);
