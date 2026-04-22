import { Skeleton } from "@heroui/react";
import styles from "./ListActivitiesHeader.module.scss";

export const ListActivitiesHeaderSkeleton = () => (
  <div className={styles.projectHeader}>
    <div className={styles.projectsInformation}>
      <div className={styles.textProjects}>
        <Skeleton className={styles.titleSk} />
        <Skeleton className={styles.subtitleSk} />
      </div>
      <div className={styles.projectsDescription}>
        <Skeleton className={styles.descriptionSk} />
        <Skeleton className={styles.mapButtonSk} />
      </div>
    </div>
    <div className={styles.imageProjects}>
      <Skeleton className={styles.imageSk} />
    </div>
  </div>
);
