import { Skeleton } from "@heroui/skeleton";
import styles from "./CategoriesDetailPage.module.scss";
import { CategoryDetailWidgetSkeleton } from "@widgets/categories";
import { ProjectsListWidgetSkeleton } from "@widgets/projects";
import { ProjectCardSkeleton } from "@entities/project";

export const CategoryDetailPageSkeleton = () => {
  return (
    <div className={styles.projectsCategoryWrapper}>
      <CategoryDetailWidgetSkeleton />

      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <Skeleton className={styles.skeletonFilterButton} />
          <Skeleton className={styles.skeletonSearchBar} />
          <Skeleton className={styles.skeletonSortDropdown} />
        </div>

        <div className={styles.projectsList}>
          <ProjectsListWidgetSkeleton
            renderSkeleton={ProjectCardSkeleton}
            items={9}
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
