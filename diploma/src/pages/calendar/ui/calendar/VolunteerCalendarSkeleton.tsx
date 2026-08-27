import { Skeleton } from "@heroui/react";
import styles from "./VolunteerCalendar.module.scss";

export const VolunteerCalendarSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.exportButton} />
      <div className={styles.calendarWrapper}>
        <div className={styles.header}>
          <div className={styles.headerStart}>
            <Skeleton className={styles.title} />
            <Skeleton className={styles.todayButton} />
          </div>
          <div className={styles.headerEnd}>
            <Skeleton className={styles.toggle} />
            <div className={styles.navButtons}>
              <Skeleton className={styles.navButton} />
              <Skeleton className={styles.navButton} />
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.weekRow}>
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className={styles.weekDay} />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className={styles.weekRow}>
              {Array.from({ length: 7 }).map((_, col) => (
                <Skeleton key={col} className={styles.cell} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
