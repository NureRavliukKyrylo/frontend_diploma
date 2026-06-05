import { Skeleton } from "@heroui/skeleton";
import styles from "./MyOfferControlCard.module.scss";

export const MyOfferControlCardSkeleton = () => {
  return (
    <div className={styles.myOfferWrapper}>
      <div className={styles.leftContent}>
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonCost} />
        <div>
          <Skeleton className={styles.skeletonDesc} />
          <Skeleton className={styles.skeletonDescShort} />
        </div>
        <Skeleton className={styles.skeletonStatus} />
      </div>
      <div className={styles.rightContent}>
        <Skeleton className={styles.skeletonStatusOffer} />
        <Skeleton className={styles.skeletonBookings} />
      </div>
    </div>
  );
};
