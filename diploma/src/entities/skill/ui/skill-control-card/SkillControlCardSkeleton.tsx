import { Skeleton } from "@heroui/skeleton";
import styles from "./SkillControlCard.module.scss";

export const SkillControlCardSkeleton = () => {
  return (
    <div className={styles.skilControlCardWrapper}>
      <Skeleton className={styles.skeletonMenuButton} />
      <div className={styles.skillControlInfo}>
        <Skeleton className={styles.skeletonImage} />
        <Skeleton className={styles.skeletonName} />
      </div>
    </div>
  );
};
