import { Skeleton } from "@heroui/skeleton";
import styles from "./MyOfferPage.module.scss";

export const MyOfferPageSkeleton = () => {
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
        </div>
      </div>
      <Skeleton className={styles.skeletonToggle} />
      <Skeleton className={styles.skeletonContent} />
    </div>
  );
};
