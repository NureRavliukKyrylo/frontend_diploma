import { Skeleton } from "@heroui/skeleton";
import styles from "./SkillControlCard.module.scss";

interface SkillControlCardSkeletonProps {
  showLevel?: boolean;
}

export const SkillControlCardSkeleton = ({
  showLevel,
}: SkillControlCardSkeletonProps) => {
  return (
    <div className={styles.skillControlCardWrapper}>
      <Skeleton className={styles.skeletonMenuButton} />
      <div className={styles.skillCardBaseSkeleton}>
        <Skeleton className={styles.skeletonImage} />
        <Skeleton className={styles.skeletonName} />
        {showLevel && <Skeleton className={styles.skeletonLevel} />}
      </div>
    </div>
  );
};
