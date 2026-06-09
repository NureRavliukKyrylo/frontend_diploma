import { Skeleton } from "@heroui/skeleton";
import styles from "./OfferPage.module.scss";

export const OfferPageSkeleton = () => {
  return (
    <div className={styles.wrapperOfferPage}>
      <div className={styles.offerPageHeader}>
        <div className={styles.offerOwnerInfo}>
          <div className={styles.titleHeader}>
            <Skeleton className={styles.skeletonTitle} />
            <div className={styles.offerMetaInfo}>
              <Skeleton className={styles.skeletonMetaChip} />
              <Skeleton className={styles.skeletonMetaChip} />
              <Skeleton className={styles.skeletonMetaChip} />
            </div>
          </div>
          <Skeleton className={styles.skeletonOwnerInfo} />
        </div>
        <div className={styles.offerFooterContent}>
          <Skeleton className={styles.skeletonDescription} />
          <Skeleton className={styles.skeletonButton} />
        </div>
      </div>
      <Skeleton className={styles.skeletonContent} />
    </div>
  );
};
