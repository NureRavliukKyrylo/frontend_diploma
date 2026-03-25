import { Skeleton } from "@heroui/skeleton";
import styles from "./ProjectPage.module.scss";

export const ProjectPageSkeleton = () => {
  return (
    <div className={styles.wrapperProjectPage}>
      <div className={styles.projectPageHeader}>
        <div className={styles.headerProjectInfo}>
          <Skeleton className={styles.skeletonTitle} />
          <div className={styles.organizationInfo}>
            <Skeleton className={styles.skeletonOrgImage} />
            <Skeleton className={styles.skeletonOrgName} />
          </div>
        </div>
        <div className={styles.statsProjectInfo}>
          <Skeleton className={styles.skeletonLevelBar} />
          <Skeleton className={styles.skeletonRating} />
        </div>
        <div className={styles.projectFooterContent}>
          <Skeleton className={styles.skeletonDescription} />
          <div className={styles.wrapperButton}>
            <div className={styles.joinProjectBlockButton}>
              <Skeleton className={styles.skeletonButton} />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className={styles.skeletonToggle} />
      <Skeleton className={styles.skeletonContent} />
    </div>
  );
};
