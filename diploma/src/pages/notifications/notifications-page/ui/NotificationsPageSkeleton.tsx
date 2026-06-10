import { Skeleton } from "@heroui/skeleton";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { NotificationItemSkeleton } from "@entities/notification";
import styles from "./NotificationsPage.module.scss";

export const NotificationsPageSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.topContent}>
            <Skeleton className={styles.skeletonTitle} />
            <Skeleton className={styles.skeletonBadge} />
          </div>
          <div className={styles.bottomContent}>
            <Skeleton className={styles.skeletonToggle} />
            <Skeleton className={styles.skeletonFilter} />
          </div>
        </div>
        <div className={styles.headerRight}>
          <Skeleton className={styles.skeletonAction} />
          <Skeleton className={styles.skeletonAction} />
        </div>
      </div>

      <ListWidgetSkeleton
        renderSkeleton={() => <NotificationItemSkeleton />}
        items={15}
      />
    </div>
  );
};
