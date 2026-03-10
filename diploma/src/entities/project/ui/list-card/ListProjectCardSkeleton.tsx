import { Skeleton } from "@heroui/skeleton";
import styles from "./ListProjectCard.module.scss";

export const ListProjectCardSkeleton = () => {
  return (
    <div className={styles.listCardProjectWrapper}>
      <Skeleton className={styles.skeletonName} />
      <Skeleton className={styles.skeletonSubtitle} />
    </div>
  );
};
