import { Skeleton } from "@heroui/react";
import { ProjectsHeaderSkeleton } from "@widgets/projects";
import styles from "./ProjectsPage.module.scss";
import { ProjectCardSkeleton } from "@entities/project";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

export const ProjectsPageSkeleton = () => (
  <div className={styles.projectsWrapper}>
    <ProjectsHeaderSkeleton />

    <div className={styles.mainProjectsSection}>
      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <Skeleton className={styles.filterToggleSk} />
          <Skeleton className={styles.searchBarSk} />
          <Skeleton className={styles.sortDropdownSk} />
        </div>

        <div className={styles.projectsList}>
          <ListWidgetSkeleton
            items={9}
            renderSkeleton={ProjectCardSkeleton}
            className={styles.projectsListSkeletonWrapper}
          />
        </div>
      </div>

      <div className={styles.paginationSk}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className={styles.paginationDotSk} />
        ))}
      </div>
    </div>
  </div>
);
