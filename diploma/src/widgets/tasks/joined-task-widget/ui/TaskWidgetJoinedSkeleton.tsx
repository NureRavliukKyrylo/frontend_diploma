import { Skeleton } from "@heroui/react";
import styles from "./TaskWidgetJoined.module.scss";

export const TaskWidgetJoinedSkeleton = () => {
  return (
    <div className={styles.wrapperTaskJoinedWidget}>
      <div className={styles.taskWidgetJoinedHeader}>
        <div className={styles.headerTaskJoinedInfo}>
          <Skeleton className={styles.skeletonStatusChip} />
          <div className={styles.mainTaskData}>
            <div className={styles.taskOrganizationInfo}>
              <div className={styles.titleHeader}>
                <Skeleton className={styles.skeletonTitle} />
                <div className={styles.taskMetaInfo}>
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
            <div className={styles.relatedActivities}>
              <Skeleton className={styles.skeletonActivityPill} />
              <Skeleton className={styles.skeletonActivityPill} />
            </div>
          </div>
        </div>
        <div className={styles.taskJoinedFooterContent}>
          <Skeleton className={styles.skeletonDescription} />
          <div className={styles.leaveJoinedTaskBlockButton}>
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
