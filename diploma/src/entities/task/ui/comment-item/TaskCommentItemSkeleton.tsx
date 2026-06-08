import { Skeleton } from "@heroui/react";
import styles from "./TaskCommentItem.module.scss";

interface TaskCommentItemSkeletonProps {
  className?: string;
}

export const TaskCommentItemSkeleton = ({
  className,
}: TaskCommentItemSkeletonProps) => (
  <div className={`${styles.commentWrapper} ${className ?? ""}`}>
    <Skeleton className={styles.avatarSk} />
    <div className={styles.bodyWrapper}>
      <div className={styles.initials}>
        <Skeleton className={styles.nameSk} />
        <Skeleton className={styles.roleSk} />
      </div>
      <Skeleton className={styles.textSk} />
      <Skeleton className={styles.textSkShort} />
    </div>
  </div>
);
