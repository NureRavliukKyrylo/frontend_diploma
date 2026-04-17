import { Skeleton } from "@heroui/react";
import styles from "./OrganizationsPage.module.scss";
import { OrganizationsHeaderSkeleton } from "@widgets/organizations";
import { OrganizationCardSkeleton } from "@entities/organization";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

export const OrganizationsPageSkeleton = () => (
  <div className={styles.organizationsWrapper}>
    <OrganizationsHeaderSkeleton />

    <div className={styles.mainOrganizationsSection}>
      <div className={styles.filterOrganizationsWrapper}>
        <div className={styles.filtersInteractions}>
          <Skeleton className={styles.filterToggleSk} />
          <Skeleton className={styles.searchBarSk} />
          <Skeleton className={styles.sortDropdownSk} />
        </div>

        <div className={styles.organizationsList}>
          <ListWidgetSkeleton
            items={9}
            renderSkeleton={OrganizationCardSkeleton}
            className={styles.organizationsListSkeletonWrapper}
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
