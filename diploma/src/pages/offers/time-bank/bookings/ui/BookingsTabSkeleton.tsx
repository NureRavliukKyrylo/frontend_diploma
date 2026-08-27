import { Skeleton } from "@heroui/react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { BookingControlCardSkeleton } from "@entities/offer";
import styles from "./BookingsTab.module.scss";

export const BookingsTabSkeleton = () => {
  return (
    <div className={styles.bookingsTabWrapper}>
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
          items={8}
          renderSkeleton={() => (
            <div className={styles.bookingCardMotion}>
              <BookingControlCardSkeleton />
            </div>
          )}
          className={styles.bookingsGrid}
        />
      </div>
    </div>
  );
};
