import { Skeleton } from "@heroui/skeleton";
import styles from "./OverviewTab.module.scss";

export const OverviewTabSkeleton = () => {
  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.topRow}>
        <Skeleton className={styles.skeletonBalanceCard} />
        <Skeleton className={styles.skeletonLevelCard} />
      </div>

      <div className={styles.statsRow}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className={styles.skeletonStatCard} />
        ))}
      </div>

      <Skeleton className={styles.skeletonTransactionsCard} />
    </div>
  );
};
