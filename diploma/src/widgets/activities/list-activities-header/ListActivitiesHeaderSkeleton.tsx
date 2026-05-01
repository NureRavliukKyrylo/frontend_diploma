import { Skeleton } from "@heroui/react";
import styles from "./ListActivitiesHeader.module.scss";

export const ListActivitiesHeaderSkeleton = () => (
  <div className={styles.activitiesHeader}>
    <div className={styles.activitiesInformation}>
      <div className={styles.textActivitiesInfotamtion}>
        <div className={styles.textActivities}>
          <Skeleton className={styles.titleSk} />
          <Skeleton className={styles.subtitleSk} />
        </div>
        <div className={styles.activitiesDescription}>
          <Skeleton className={styles.descriptionSk} />
          <Skeleton className={styles.descriptionShortSk} />
        </div>
      </div>
      <div className={styles.listActivitiesToggle}>
        <Skeleton className={styles.toggleSk} />
      </div>
    </div>
    <div className={styles.imageActivities}>
      <Skeleton className={styles.imageSk} />
    </div>
  </div>
);
