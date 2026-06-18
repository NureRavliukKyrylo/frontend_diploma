import { Skeleton } from "@heroui/react";
import styles from "./JoinedEventPage.module.scss";

export const JoinedEventPageSkeleton = () => {
  return (
    <div className={styles.wrapperJoinedEventPage}>
      <div className={styles.eventJoinedPageHeader}>
        <div className={styles.headerEventInfo}>
          <div className={styles.mainEventData}>
            <div className={styles.eventOrganizationInfo}>
              <div className={styles.titleHeader}>
                <Skeleton className={styles.skeletonTitle} />
                <div className={styles.eventJoinedMetaInfo}>
                  <Skeleton className={styles.skeletonMetaChip} />
                  <Skeleton className={styles.skeletonMetaChip} />
                  <Skeleton className={styles.skeletonMetaChip} />
                  <Skeleton className={styles.skeletonMetaChip} />
                </div>
              </div>
              <div className={styles.chatOrganizationBlock}>
                <Skeleton className={styles.skeletonOrgPill} />
                <Skeleton className={styles.skeletonChatPill} />
              </div>
            </div>
            <Skeleton className={styles.skeletonProjectPill} />
          </div>
        </div>
        <div className={styles.statsJoinedEventInfo}>
          <Skeleton className={styles.skeletonLevelBar} />
        </div>
        <div className={styles.eventJoinedFooterContent}>
          <Skeleton className={styles.skeletonDescription} />
          <div className={styles.leaveEventBlockButton}>
            <Skeleton className={styles.skeletonButton} />
          </div>
        </div>
      </div>
      <Skeleton className={styles.skeletonToggle} />
      <Skeleton className={styles.skeletonContent} />
    </div>
  );
};
