import { Skeleton } from "@heroui/skeleton";
import baseStyles from "../base/ProjectCardBase.module.scss";
import styles from "./ProjectCard.module.scss";

export const ProjectCardSkeleton = () => {
  return (
    <div className={styles.projectCardWrapper}>
      <div className={baseStyles.organizationInfoBlock}>
        <Skeleton className={baseStyles.imageOrganization} />
        <Skeleton className={baseStyles.skeletonOrgName} />
      </div>

      <div className={baseStyles.projectInfoBlock}>
        <Skeleton className={baseStyles.skeletonTitle} />
        <Skeleton className={baseStyles.skeletonDescLine} />
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

      <div className={styles.footerCard}>
        <div className={styles.avatarsGroup}>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className={`${styles.avatarVolunteer} ${baseStyles.skeletonAvatar}`}
            />
          ))}
        </div>
        <Skeleton className={baseStyles.skeletonTasks} />
      </div>
    </div>
  );
};
