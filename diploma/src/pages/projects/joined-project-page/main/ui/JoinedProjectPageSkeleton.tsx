import { Skeleton } from "@heroui/skeleton";
import styles from "./JoinedProjectPage.module.scss";

export const JoinedProjectPageSkeleton = () => {
  return (
    <div className={styles.wrapperJoinedProjectPage}>
      <div className={styles.projectJoinedPageHeader}>
        <div className={styles.headerJoinedProjectInfo}>
          <div className={styles.mainJoinedProjectData}>
            <div className={styles.titleHeader}>
              <Skeleton className={styles.skeletonTitle} />
              <div className={styles.projectJoinedMetaInfo}>
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
        </div>
        <div className={styles.statsJoinedProjectInfo}>
          <Skeleton className={styles.skeletonLevelBar} />
        </div>
        <div className={styles.projectJoinedFooterContent}>
          <Skeleton className={styles.skeletonDescription} />
          <div className={styles.leaveJoinedProjectBlockButton}>
            <Skeleton className={styles.skeletonButton} />
          </div>
        </div>
      </div>
      <Skeleton className={styles.skeletonToggle} />
      <Skeleton className={styles.skeletonContent} />
    </div>
  );
};
