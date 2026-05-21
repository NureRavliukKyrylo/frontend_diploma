import { Skeleton } from "@heroui/skeleton";
import baseStyles from "../base-card/EventCardBase.module.scss";
import styles from "./EventCard.module.scss";

export const EventCardSkeleton = () => (
  <div className={styles.eventCardWrapper}>
    <div className={baseStyles.organizationInfoBlock}>
      <Skeleton className={styles.skeletonOrgLogo} />
      <Skeleton className={styles.skeletonOrgName} />
    </div>

    <div className={baseStyles.eventInfoBlock}>
      <Skeleton className={styles.skeletonTitle} />
      <Skeleton className={styles.skeletonDescLine} />
      <Skeleton className={styles.skeletonDescLineShort} />
    </div>

    <div className={styles.eventCardFooter}>
      <hr className={baseStyles.dividerLine} />

      <div className={baseStyles.bottomBlock}>
        <Skeleton className={styles.skeletonDeadline} />
        <Skeleton className={styles.skeletonProgress} />
      </div>

      <div className={styles.footerCard}>
        <div className={styles.avatarsGroup}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={styles.skeletonAvatar} />
          ))}
        </div>
        <div className={styles.endContent}>
          <Skeleton className={styles.skeletonBadge} />
          <Skeleton className={styles.skeletonBadge} />
        </div>
      </div>
    </div>
  </div>
);
