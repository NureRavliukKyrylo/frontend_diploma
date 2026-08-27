import { Skeleton } from "@heroui/react";
import styles from "./EventPage.module.scss";

export const EventPageSkeleton = () => {
  return (
    <div className={styles.wrapperEventPage}>
      <div className={styles.eventPageHeader}>
        <div className={styles.headerEventInfo}>
          <div className={styles.mainEventData}>
            <div className={styles.eventOrganizationInfo}>
              <div className={styles.titleHeader}>
                <Skeleton className={styles.skeletonTitle} />
                <div className={styles.eventMetaInfo}>
                  <Skeleton className={styles.skeletonMetaChip} />
                  <Skeleton className={styles.skeletonMetaChip} />
                  <Skeleton className={styles.skeletonMetaChip} />
                </div>
              </div>
              <div className={styles.organizationInfo}>
                <Skeleton className={styles.skeletonOrgImage} />
                <Skeleton className={styles.skeletonOrgName} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statsEventInfo}>
          <Skeleton className={styles.skeletonLevelBar} />
          <Skeleton className={styles.skeletonRating} />
        </div>
        <div className={styles.eventFooterContent}>
          <Skeleton className={styles.skeletonDescription} />
          <div className={styles.joinEventBlockButton}>
            <Skeleton className={styles.skeletonButton} />
          </div>
        </div>
      </div>
      <Skeleton className={styles.skeletonToggle} />
      <Skeleton className={styles.skeletonContent} />
    </div>
  );
};
