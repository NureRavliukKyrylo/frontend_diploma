import { Skeleton } from "@heroui/react";
import styles from "./MyActivitiesHeader.module.scss";

export const MyActivitiesHeaderSkeleton = () => (
  <>
    <Skeleton className={styles.avatarSk} />
    <Skeleton className={styles.toggleSk} />
    <div className={styles.baseUserInfo}>
      <Skeleton className={styles.nameSk} />
      <Skeleton className={styles.emailSk} />
    </div>
    <Skeleton className={styles.statisticsBlockSk} />
  </>
);
