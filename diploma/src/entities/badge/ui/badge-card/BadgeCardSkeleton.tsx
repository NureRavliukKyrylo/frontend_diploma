import { Skeleton } from "@heroui/skeleton";
import styles from "./BadgeCard.module.scss";

export const BadgeCardSkeleton = () => {
  return (
    <div className={`${styles.badgeImageBlock} ${styles.skeleton}`}>
      <Skeleton className={styles.skeletonBadgeImage} />
    </div>
  );
};

export const BadgeCardDetailedSkeleton = ({
  classImgName,
}: {
  classImgName?: string;
}) => {
  return (
    <div className={styles.badgeCardWrapper}>
      <div className={classImgName}>
        <BadgeCardSkeleton />
      </div>
      <div className={styles.badgeInfo}>
        <Skeleton className={styles.skeletonBadgeTitle} />
        <Skeleton className={styles.skeletonBadgeRank} />
      </div>
    </div>
  );
};
