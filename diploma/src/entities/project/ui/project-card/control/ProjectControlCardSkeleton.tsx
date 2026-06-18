import { Skeleton } from "@heroui/react";
import baseStyles from "../base/ProjectCardBase.module.scss";
import styles from "./ProjectControlCard.module.scss";

export const ProjectControlCardSkeleton = () => {
  return (
    <div className={styles.projectControlCardWrapper}>
      <Skeleton className={styles.skeletonMenuButton} />
      <div className={baseStyles.organizationInfoBlock}>
        <Skeleton className={baseStyles.imageOrganization} />
        <Skeleton className={baseStyles.skeletonOrgName} />
      </div>

      <Skeleton className={styles.skeletonStatusBadge} />

      <div className={baseStyles.projectInfoBlock}>
        <Skeleton className={baseStyles.skeletonTitle} />
        <Skeleton className={baseStyles.skeletonDescLine} />
        <Skeleton className={baseStyles.skeletonDescLineShort} />
      </div>

      <div className={baseStyles.deadlineBlock}>
        <Skeleton className={baseStyles.skeletonIcon} />
        <Skeleton className={baseStyles.skeletonDeadlineText} />
      </div>

      <div className={baseStyles.progressBlock}>
        <div className={baseStyles.progressInfo}>
          <Skeleton className={baseStyles.skeletonProgressLabel} />
          <Skeleton className={baseStyles.skeletonProgressLabel} />
        </div>
        <Skeleton className={baseStyles.skeletonProgressBar} />
      </div>

      <Skeleton className={styles.skeletonLearnMore} />
    </div>
  );
};
