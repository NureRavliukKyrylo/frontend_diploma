import { Skeleton } from "@heroui/react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ReportCaseItemSkeleton } from "@entities/report";
import styles from "./ReportsPage.module.scss";
import skeletonStyles from "./ReportsPage.module.scss";

export const ReportsPageSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.baseStats}>
          <div className={styles.topContent}>
            <Skeleton className={skeletonStyles.skeletonStatLabel} />
            <Skeleton className={skeletonStyles.skeletonStatTotal} />
            <div className={styles.lineDivider} />
          </div>
          <div className={styles.bottomContent}>
            {Array.from({ length: 3 }).map((_, i) => (
              <>
                <div key={i} className={styles.statBlock}>
                  <Skeleton className={skeletonStyles.skeletonStatLabel} />
                  <Skeleton className={skeletonStyles.skeletonStatValue} />
                </div>
                <div className={styles.lineDivider} />
              </>
            ))}
          </div>
        </div>
        <Skeleton className={skeletonStyles.skeletonFilter} />
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.searchRow}>
          <Skeleton className={skeletonStyles.skeletonSearchBar} />
          <Skeleton className={skeletonStyles.skeletonSortDropdown} />
        </div>

        <ListWidgetSkeleton
          items={12}
          renderSkeleton={() => <ReportCaseItemSkeleton />}
          className={styles.reportsList}
        />

        <div className={styles.paginationWrapper}>
          <Skeleton className={skeletonStyles.skeletonPagination} />
        </div>
      </div>
    </div>
  );
};
