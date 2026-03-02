import { Skeleton } from "@heroui/skeleton";
import styles from "./ProjectCard.module.scss";

export const ProjectCardSkeleton = () => {
  return (
    <div className={styles.projectCardWrapper}>
      <div className={styles.organizationInfoBlock}>
        <Skeleton className={styles.imageOrganization} />
        <Skeleton className={styles.skeletonOrgName} />
      </div>

      <div className={styles.projectInfoBlock}>
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonDescLine} />
        <Skeleton className={styles.skeletonDescLine} />
        <Skeleton className={styles.skeletonDescLineShort} />
      </div>

      <div className={styles.deadlineBlock}>
        <Skeleton className={styles.skeletonIcon} />
        <Skeleton className={styles.skeletonDeadlineText} />
      </div>

      <div className={styles.progressBlock}>
        <div className={styles.progressInfo}>
          <Skeleton className={styles.skeletonProgressLabel} />
          <Skeleton className={styles.skeletonProgressLabel} />
        </div>
        <Skeleton className={styles.skeletonProgressBar} />
      </div>

      <div className={styles.footerCard}>
        <div className={styles.avatarsGroup}>
          <Skeleton
            className={`${styles.avatarVolunteer} ${styles.skeletonAvatar}`}
          />
          <Skeleton
            className={`${styles.avatarVolunteer} ${styles.skeletonAvatar}`}
          />
          <Skeleton
            className={`${styles.avatarVolunteer} ${styles.skeletonAvatar}`}
          />
        </div>
        <Skeleton className={styles.skeletonTasks} />
      </div>
    </div>
  );
};
