import { Skeleton } from "@heroui/react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { MyOfferControlCardSkeleton } from "@entities/offer";
import styles from "./MyOffersTab.module.scss";

export const MyOffersTabSkeleton = () => {
  return (
    <div className={styles.myOffersTabWrapper}>
      <aside className={styles.sidebar}>
        <Skeleton className={styles.skeletonStats} />
        <Skeleton className={styles.skeletonCreateButton} />
        <Skeleton className={styles.skeletonFilter} />
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.searchRow}>
          <Skeleton className={styles.skeletonSearch} />
          <Skeleton className={styles.skeletonSort} />
        </div>
        <ListWidgetSkeleton
          items={12}
          renderSkeleton={() => (
            <div className={styles.offerCardMotion}>
              <MyOfferControlCardSkeleton />
            </div>
          )}
          className={styles.myOffersGrid}
        />
      </div>
    </div>
  );
};
