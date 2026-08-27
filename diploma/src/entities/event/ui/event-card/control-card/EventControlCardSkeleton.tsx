import { Skeleton } from "@heroui/react";
import baseStyles from "../base-card/EventCardBase.module.scss";
import styles from "./EventControlCard.module.scss";

export const EventControlCardSkeleton = () => (
  <div className={styles.eventControlCardWrapper}>
    <div className={baseStyles.organizationInfoBlock}>
      <Skeleton className={styles.skeletonOrgLogo} />
      <Skeleton className={styles.skeletonOrgName} />
    </div>

    <Skeleton className={styles.skeletonStatusBadge} />

    <div className={baseStyles.eventInfoBlock}>
      <Skeleton className={styles.skeletonTitle} />
      <Skeleton className={styles.skeletonDescLine} />
      <Skeleton className={styles.skeletonDescLineShort} />
    </div>

    <hr className={baseStyles.dividerLine} />

    <div className={baseStyles.bottomBlock}>
      <Skeleton className={styles.skeletonDeadline} />
      <Skeleton className={styles.skeletonProgress} />
    </div>

    <Skeleton className={styles.skeletonLearnMore} />
  </div>
);
