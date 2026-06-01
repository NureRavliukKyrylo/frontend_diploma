import { Skeleton } from "@heroui/skeleton";
import styles from "./TaskBoardControlItem.module.scss";
import baseStyles from "../base/TaskBoardItemBase.module.scss";

export const TaskBoardControlItemSkeleton = () => (
  <div className={styles.taskBoardControlItemwrapper}>
    <div className={styles.actionsAnchor}>
      <Skeleton className={baseStyles.skeletonActionsIcon} />
    </div>
    <Skeleton className={baseStyles.skeletonTitle} />
    <Skeleton className={baseStyles.skeletonDescLine} />
    <Skeleton className={baseStyles.skeletonDescLineShort} />
    <div className={baseStyles.deadlineBlock}>
      <Skeleton className={baseStyles.skeletonCalendarIcon} />
      <Skeleton className={baseStyles.skeletonDeadlineDate} />
    </div>
  </div>
);
