import { Skeleton } from "@heroui/react";
import styles from "./OrganizationsHeader.module.scss";

export const OrganizationsHeaderSkeleton = () => (
  <div className={styles.organizationListHeader}>
    <div className={styles.organizationsMainInfo}>
      <div className={styles.headerTextOrganizations}>
        <Skeleton className={styles.headerTextSk} />
        <Skeleton className={styles.totalOrganizationsSk} />
      </div>
      <div className={styles.bottomTextOrganizations}>
        <Skeleton className={styles.bottomTextSk} />
        <Skeleton className={styles.joinedTextSk} />
      </div>
    </div>
    <div className={styles.organizationsMainInfoImage}>
      <Skeleton className={styles.imageSk} />
    </div>
  </div>
);
