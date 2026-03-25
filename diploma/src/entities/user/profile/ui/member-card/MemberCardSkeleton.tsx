import { Skeleton } from "@heroui/skeleton";
import styles from "./MemberCard.module.scss";

export const MemberCardSkeleton = () => {
  return (
    <div className={styles.memberCardWrapper}>
      <Skeleton className={styles.imageMemberSkeleton} />
      <div className={styles.userInitials}>
        <Skeleton className={styles.skeletonFullName} />
        <Skeleton className={styles.skeletonRole} />
      </div>
    </div>
  );
};
