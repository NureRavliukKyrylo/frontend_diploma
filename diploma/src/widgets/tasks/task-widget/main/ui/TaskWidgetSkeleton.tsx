import { Skeleton } from "@heroui/react";
import styles from "./TaskWidget.module.scss";

export const TaskWidgetSkeleton = () => {
  return (
    <div className={styles.wrapperTaskWidget}>
      <div className={styles.taskWidgetHeader}>
        <div className={styles.headerTaskInfo}>
          <Skeleton className={styles.skeletonMetaChip} />

          <div className={styles.mainTaskData}>
            <div className={styles.taskOrganizationInfo}>
              <div className={styles.titleHeader}>
                <Skeleton className={styles.skeletonTitle} />
                <div className={styles.taskMetaInfo}>
                  <Skeleton className={styles.skeletonMetaChip} />
                  <Skeleton className={styles.skeletonMetaChip} />
                  <Skeleton className={styles.skeletonMetaChip} />
                </div>
              </div>

              <div className={styles.rightBlockInfo}>
                <div className={styles.organizationInfo}>
                  <Skeleton className={styles.skeletonOrgImage} />
                  <Skeleton className={styles.skeletonOrgName} />
                </div>
                <Skeleton className={styles.skeletonRating} />
              </div>
            </div>

            <div className={styles.relatedActivities}>
              <Skeleton className={styles.skeletonActivityPill} />
              <Skeleton className={styles.skeletonActivityPill} />
            </div>
          </div>
        </div>

        <div className={styles.taskFooterContent}>
          <Skeleton className={styles.skeletonDescription} />
          <div className={styles.joinTaskBlockButton}>
            <Skeleton className={styles.skeletonButton} />
          </div>
        </div>
      </div>

      <div className={styles.contentBlock}>
        <Skeleton className={styles.skeletonToggle} />
        <Skeleton className={styles.skeletonContent} />
      </div>
    </div>
  );
};
