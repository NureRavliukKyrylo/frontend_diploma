import { Skeleton } from "@heroui/react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { OfferListItemSkeleton } from "@entities/offer";
import styles from "./OffersTab.module.scss";

export const OffersTabSkeleton = () => {
  return (
    <div className={styles.offersTabWrapper}>
      <aside className={styles.sidebar}>
        <Skeleton className={styles.skeletonStats} />
        <Skeleton className={styles.skeletonFilter} />
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.searchRow}>
          <Skeleton className={styles.skeletonSearch} />
          <Skeleton className={styles.skeletonSort} />
        </div>
        <ListWidgetSkeleton
          items={12}
          renderSkeleton={() => <OfferListItemSkeleton />}
          className={styles.offersGrid}
        />
      </div>
    </div>
  );
};
