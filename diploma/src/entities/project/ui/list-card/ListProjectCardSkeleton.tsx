import { Skeleton } from "@heroui/skeleton";
import styles from "./ListProjectCard.module.scss";

export const ListProjectCardSkeleton = () => {
  return (
    <div className={styles.listCardProjectWrapper}>
      <div className={styles.headerInfo}>
        <Skeleton className={styles.skeletonName} />
        <Skeleton className={styles.skeletonSubtitle} />
      </div>
      <div className={styles.bottomContent}>
        <Skeleton className={styles.skeletonRating} />
        <Skeleton className={styles.skeletonRatingValue} />
      </div>
    </div>
  );
};
