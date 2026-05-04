import { Skeleton } from "@heroui/skeleton";
import styles from "./CategoryDetailPage.module.scss";
import { CategoryDetailHeaderSkeleton } from "@widgets/categories";

export const CategoryDetailPageSkeleton = () => {
  return (
    <div className={styles.activitiesCategoryWrapper}>
      <CategoryDetailHeaderSkeleton />

      <div className={styles.filterCategoriesWrapper}>
        <div className={styles.filtersInteractions}>
          <Skeleton className={styles.skeletonFilterButton} />
          <Skeleton className={styles.skeletonSearchBar} />
          <Skeleton className={styles.skeletonSortDropdown} />
        </div>

        <Skeleton className={styles.contentBlockSk} />
      </div>
    </div>
  );
};
