import { Skeleton } from "@heroui/react";
import styles from "./SkillsPage.module.scss";
import skeletonStyles from "./SkillsPage.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { SkillControlCardSkeleton } from "@entities/skill";

export const SkillsPageSkeleton = () => (
  <div className={styles.skillsPageWrapper}>
    <div className={styles.skillsPageHeader}>
      <Skeleton className={skeletonStyles.titleSk} />
    </div>

    <div className={styles.mainSkillsSection}>
      <div className={styles.filterSkillsWrapper}>
        <div className={styles.filtersInteractions}>
          <Skeleton className={skeletonStyles.filterToggleSk} />
          <Skeleton className={skeletonStyles.searchBarSk} />
          <Skeleton className={skeletonStyles.sortDropdownSk} />
        </div>

        <div className={styles.skillsList}>
          <ListWidgetSkeleton
            items={12}
            renderSkeleton={() => <SkillControlCardSkeleton />}
            className={styles.skillsListWrapper}
          />
        </div>
      </div>
    </div>

    <div className={styles.paginationWrapper}>
      <Skeleton className={skeletonStyles.paginationSk} />
    </div>
  </div>
);
