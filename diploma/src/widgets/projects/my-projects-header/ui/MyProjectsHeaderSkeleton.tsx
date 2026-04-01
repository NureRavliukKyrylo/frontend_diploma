import { Skeleton } from "@heroui/react";
import styles from "./MyProjectsHeader.module.scss";

export const MyProjectsHeaderSkeleton = () => (
  <>
    <Skeleton className={styles.avatarSk} />
    <div className={styles.manageBlock}>
      <Skeleton className={styles.toggleSk} />
      <div className={styles.usersDetailedInfo}>
        <div className={styles.baseUserInfo}>
          <Skeleton className={styles.nameSk} />
          <Skeleton className={styles.emailSk} />
        </div>
        <Skeleton className={styles.statisticsBlockSk} />
      </div>
    </div>
  </>
);
