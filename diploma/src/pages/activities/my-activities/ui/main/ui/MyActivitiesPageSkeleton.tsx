import styles from "./MyActivitiesPage.module.scss";
import { Skeleton } from "@heroui/react";
import { MyProjectsHeaderSkeleton } from "@widgets/projects";

export const MyActivitiesPageSkeleton = () => (
  <div className={styles.myProjectsWrapper}>
    <div className={styles.userInfo}>
      <MyProjectsHeaderSkeleton />
    </div>
    <div className={styles.contentFiltersWrapper}>
      <div className={styles.filtersInteractionsSk}>
        <Skeleton className={styles.filterToggleSk} />
        <Skeleton className={styles.searchBarSk} />
        <Skeleton className={styles.sortDropdownSk} />
      </div>
      <div className={styles.activityInfo}>
        <Skeleton className={styles.contentBlockSk} />
      </div>
    </div>
  </div>
);
