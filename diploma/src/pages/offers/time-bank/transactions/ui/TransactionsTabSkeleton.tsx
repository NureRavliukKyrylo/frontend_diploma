import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./TransactionsTab.module.scss";
import { Skeleton } from "@heroui/react";
import { TransactionListItemSkeleton } from "@entities/offer";

export const TransactionsTabSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.baseStats}>
          <div className={styles.topContent}>
            <Skeleton className={styles.skeletonBalanceLabel} />
            <Skeleton className={styles.skeletonBalanceValue} />
          </div>
          <div className={styles.bottomContent}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.statBlock}>
                <Skeleton className={styles.skeletonStatLabel} />
                <Skeleton className={styles.skeletonStatValue} />
              </div>
            ))}
          </div>
        </div>
        <Skeleton className={styles.skeletonFilter} />
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.transactionsWrapper}>
          <ListWidgetSkeleton
            items={12}
            renderSkeleton={() => (
              <div className={styles.transactionItem}>
                <TransactionListItemSkeleton />
              </div>
            )}
            className={styles.skeletonGrid}
          />
        </div>
      </div>
    </div>
  );
};
