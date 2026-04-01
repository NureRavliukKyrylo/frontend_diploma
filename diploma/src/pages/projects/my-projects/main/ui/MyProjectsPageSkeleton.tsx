import styles from "./MyProjectsPage.module.scss";
import skeletonStyles from "./MyProjectsPage.module.scss";
import { Skeleton } from "@heroui/react";
import { MyProjectsHeaderSkeleton } from "@widgets/projects";

export const MyProjectsPageSkeleton = () => (
  <div className={styles.myProjectsWrapper}>
    <div className={styles.userInfo}>
      <MyProjectsHeaderSkeleton />
    </div>
    <div className={styles.contentFiltersWrapper}>
      <div className={styles.filtersInteractionsSk}>
        <Skeleton className={skeletonStyles.filterToggleSk} />
        <Skeleton className={skeletonStyles.searchBarSk} />
        <Skeleton className={skeletonStyles.sortDropdownSk} />
      </div>
      <div className={styles.activityInfo}>
        <Skeleton className={skeletonStyles.contentBlockSk} />
      </div>
    </div>
  </div>
);
