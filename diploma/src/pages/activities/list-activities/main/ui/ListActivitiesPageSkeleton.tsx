import { ListActivitiesHeaderSkeleton } from "@widgets/activities";
import styles from "./ListActivitiesPage.module.scss";
import { Skeleton } from "@heroui/react";

export const ListActivitiesPageSkeleton = () => (
  <div className={styles.activitiesWrapper}>
    <ListActivitiesHeaderSkeleton />
    <div className={styles.contentFiltersWrapper}>
      <div className={styles.filtersInteractions}>
        <Skeleton className={styles.filterToggleSk} />
        <Skeleton className={styles.searchBarSk} />
        <Skeleton className={styles.sortDropdownSk} />
      </div>
      <Skeleton className={styles.contentBlockSk} />
    </div>
  </div>
);
