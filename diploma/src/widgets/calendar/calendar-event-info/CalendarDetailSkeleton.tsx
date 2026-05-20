import { Skeleton } from "@heroui/skeleton";
import styles from "./CalendarEventInfo.module.scss";

export const CalendarDetailSkeleton = () => (
  <>
    <div className={styles.middleContent}>
      <div className={styles.baseInfo}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.subBaseInfoBlock}>
            <Skeleton className={styles.skeletonIcon} />
            <div className={styles.skeletonDivider} />
            <Skeleton
              className={
                i === 0 ? styles.skeletonDateText : styles.skeletonText
              }
            />
          </div>
        ))}
      </div>

      <div className={styles.descriptionInfo}>
        <Skeleton className={styles.skeletonHeading} />
        <Skeleton className={styles.skeletonDescLine} />
        <Skeleton className={styles.skeletonDescLine} />
        <Skeleton className={styles.skeletonDescLineShort} />
      </div>

      <div className={styles.participationsInfo}>
        <Skeleton className={styles.skeletonHeading} />
        <div className={styles.avatarsGroup}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={styles.skeletonAvatar} />
          ))}
        </div>
      </div>
    </div>

    <div className={styles.bottomContent}>
      <Skeleton className={styles.skeletonQuestion} />
      <div className={styles.actions}>
        <Skeleton className={styles.skeletonButton} />
        <Skeleton className={styles.skeletonButton} />
      </div>
    </div>
  </>
);
