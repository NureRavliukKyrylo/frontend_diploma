import { Skeleton } from "@heroui/skeleton";
import styles from "./TransactionListItem.module.scss";

export const TransactionListItemSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.skeletonIcon} />
      <div className={styles.content}>
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonBadge} />
      </div>
      <div className={styles.rightContent}>
        <Skeleton className={styles.skeletonAmount} />
        <Skeleton className={styles.skeletonBalance} />
      </div>
    </div>
  );
};
