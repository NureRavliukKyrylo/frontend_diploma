import { Skeleton } from "@heroui/react";
import styles from "./ReportCaseWidget.module.scss";

export const ReportCaseWidgetSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonStatusPill} />
      </div>

      <div className={styles.reporterWrapper}>
        <div className={styles.wrapperReporterInfo}>
          <Skeleton className={styles.skeletonAvatar} />
          <div className={styles.reporterInfo}>
            <Skeleton className={styles.skeletonReporterName} />
            <Skeleton className={styles.skeletonReporterLabel} />
          </div>
        </div>
        <Skeleton className={styles.skeletonDetailsText} />
        <Skeleton className={styles.skeletonDetailsTextShort} />
        <div className={styles.pills}>
          <Skeleton className={styles.skeletonPill} />
          <Skeleton className={styles.skeletonPill} />
        </div>
      </div>

      <div className={styles.detailsBlock}>
        <Skeleton className={styles.skeletonSubjectTitle} />
        <div className={styles.authorWrapper}>
          <Skeleton className={styles.skeletonAvatar} />
          <div className={styles.reporterInfo}>
            <Skeleton className={styles.skeletonReporterName} />
            <Skeleton className={styles.skeletonReporterLabel} />
          </div>
        </div>
        <div className={styles.entityContent}>
          <Skeleton className={styles.skeletonEntityLabel} />
          <Skeleton className={styles.skeletonEntityText} />
          <Skeleton className={styles.skeletonEntityTextShort} />
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionMainButtons}>
          <Skeleton className={styles.skeletonButton} />
          <Skeleton className={styles.skeletonButton} />
        </div>
        <div className={styles.actionMainButtons}>
          <Skeleton className={styles.skeletonButton} />
          <Skeleton className={styles.skeletonButton} />
        </div>
        <Skeleton className={styles.skeletonButton} />
      </div>
    </div>
  );
};
