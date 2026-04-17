import { Skeleton } from "@heroui/skeleton";
import baseStyles from "../base/OrganizationCardBase.module.scss";
import styles from "./OrganizationCard.module.scss";

export const OrganizationCardSkeleton = () => {
  return (
    <div className={styles.organizationCardWrapper}>
      <div className={baseStyles.headerOrganizationBlock}>
        <Skeleton className={styles.skeletonLogo} />
        <div className={baseStyles.headerOrganizationInfo}>
          <Skeleton className={styles.skeletonName} />
          <div className={styles.organizationProgressBlock}>
            <Skeleton className={styles.skeletonNameProgress} />
            <Skeleton className={styles.skeletonProgressBar} />
          </div>
        </div>
      </div>

      <div className={baseStyles.projectsRelatedBlock}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className={styles.skeletonProjectTag} />
        ))}
      </div>

      <div className={baseStyles.statsOrganizationBlock}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={baseStyles.statItem}>
            <Skeleton className={styles.skeletonStatValue} />
            <Skeleton className={styles.skeletonStatLabel} />
          </div>
        ))}
      </div>

      <div className={styles.footerContent}>
        <div className={styles.avatarsGroup}>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className={`${styles.avatarVolunteer} ${styles.skeletonAvatar}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
