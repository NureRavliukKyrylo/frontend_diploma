import { Skeleton } from "@heroui/react";
import styles from "./ReportCaseItem.module.scss";

export const ReportCaseItemSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarCol}>
        <Skeleton className={styles.skeletonAvatar} />
      </div>

      <div className={styles.mainContent}>
        <Skeleton className={styles.skeletonUserName} />

        <div className={styles.pills}>
          <Skeleton className={styles.skeletonReasonPill} />
          <Skeleton className={styles.skeletonSubjectPill} />
        </div>

        <Skeleton className={styles.skeletonDetails} />
        <Skeleton className={styles.skeletonDetails} />
      </div>

      <div className={styles.statusCol}>
        <Skeleton className={styles.skeletonStatusPill} />
      </div>
    </div>
  );
};
