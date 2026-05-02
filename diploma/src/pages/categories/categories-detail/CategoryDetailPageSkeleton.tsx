import { Skeleton } from "@heroui/skeleton";
import styles from "./CategoriesDetailPage.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ProjectCardSkeleton } from "@entities/project";
import { CategoryDetailHeaderSkeleton } from "@widgets/categories";

export const CategoryDetailPageSkeleton = () => {
  return (
    <div className={styles.projectsCategoryWrapper}>
      <CategoryDetailHeaderSkeleton />

      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <Skeleton className={styles.skeletonFilterButton} />
          <Skeleton className={styles.skeletonSearchBar} />
          <Skeleton className={styles.skeletonSortDropdown} />
        </div>

        <div className={styles.projectsList}>
          <ListWidgetSkeleton
            renderSkeleton={ProjectCardSkeleton}
            items={9}
            className={styles.projectsListSkeletonWrapper}
          />
        </div>
      </div>

      <div className={styles.skeletonPaginationWrapper}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className={styles.skeletonPageItem} />
        ))}
      </div>
    </div>
  );
};
