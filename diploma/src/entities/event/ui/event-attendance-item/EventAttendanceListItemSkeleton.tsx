import { Skeleton } from "@heroui/skeleton";
import styles from "./EventAttendanceListItem.module.scss";

export const EventAttendanceListItemSkeleton = () => (
  <div className={styles.eventAttendanceListItemWrapper}>
    <Skeleton className={styles.skeletonDate} />
    <Skeleton className={styles.skeletonDescription} />
    <div className={styles.statusCell}>
      <Skeleton className={styles.skeletonStatus} />
    </div>
  </div>
);
