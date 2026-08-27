import { Skeleton } from "@heroui/react";
import styles from "./BadgeDetailWidget.module.scss";

export const BadgeDetailWidgetSkeleton = () => (
  <>
    <div className={styles.imageWrapper}>
      <Skeleton className={styles.iconUrl} />
    </div>
    <div className={styles.badgeDetailInfo}>
      <div className={styles.headerInfo}>
        <div className={styles.shareTitleWrapper}>
          <Skeleton className={styles.titleSk} />
          <Skeleton className={styles.shareSk} />
        </div>
        <Skeleton className={styles.rankSk} />
      </div>

      <div className={styles.middleInfo}>
        <Skeleton className={styles.descriptionSk} />
        <div className={styles.metaInfo}>
          <div className={styles.receivedAll}>
            <div className={styles.titleInfo}>
              <Skeleton className={styles.metaLabelSk} />
              <Skeleton className={styles.metaLabelBoldSk} />
            </div>
            <Skeleton className={styles.metaValueSk} />
          </div>
          <div className={styles.earnedOn}>
            <div className={styles.titleInfo}>
              <Skeleton className={styles.metaLabelSk} />
              <Skeleton className={styles.metaLabelBoldSk} />
            </div>
            <Skeleton className={styles.metaValueSk} />
          </div>
        </div>
        <div className={styles.rarityBlock}>
          <Skeleton className={styles.rarityTitleSk} />
          <Skeleton className={styles.rarityStarsSk} />
        </div>
      </div>

      <div className={styles.bottomInfo}>
        <div className={styles.progressBlock}>
          <Skeleton className={styles.progressTitleSk} />
          <Skeleton className={styles.progressBarSk} />
          <Skeleton className={styles.progressTextSk} />
        </div>
        <div className={styles.requirementsBadge}>
          <Skeleton className={styles.requirementSk} />
        </div>
      </div>
    </div>
  </>
);
