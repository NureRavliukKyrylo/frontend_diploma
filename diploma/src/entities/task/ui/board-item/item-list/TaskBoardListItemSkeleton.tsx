import { Skeleton } from "@heroui/react";
import styles from "./TaskBoardListItem.module.scss";
import baseStyles from "../base/TaskBoardItemBase.module.scss";

export const TaskBoardListItemSkeleton = () => (
  <div className={styles.taskBoardItemwrapper}>
    <Skeleton className={baseStyles.skeletonTitle} />
    <Skeleton className={baseStyles.skeletonDescLine} />
    <Skeleton className={baseStyles.skeletonDescLineShort} />
    <div className={baseStyles.deadlineBlock}>
      <Skeleton className={baseStyles.skeletonCalendarIcon} />
      <Skeleton className={baseStyles.skeletonDeadlineDate} />
    </div>
    <div className={baseStyles.dividerLine} />
    <div className={baseStyles.footerContent}>
      <div className={styles.avatarsGroup}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className={baseStyles.skeletonAvatar} />
        ))}
      </div>
      <Skeleton className={baseStyles.skeletonFeedbackBadge} />
    </div>
  </div>
);
