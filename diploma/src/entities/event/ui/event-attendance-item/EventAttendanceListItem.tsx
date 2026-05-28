import { formatDateRange } from "@shared/libs/date";
import styles from "./EventAttendanceListItem.module.scss";
import { type EventAttendance } from "../../model";

interface EventAttendanceListItemProps {
  attendance: EventAttendance;
  setAttendance?: React.ReactNode;
}

export const EventAttendanceListItem = ({
  attendance,
  setAttendance,
}: EventAttendanceListItemProps) => {
  const now = new Date();
  const isInRange =
    now >= new Date(attendance.dateFrom) && now <= new Date(attendance.dateTo);

  return (
    <div className={styles.eventAttendancelistItemWrapper}>
      <span className={styles.dateCell}>
        {formatDateRange(attendance.dateFrom, attendance.dateTo)}
      </span>
      <span className={styles.descriptionCell}>{attendance.description}</span>
      <span className={styles.statusCell}>
        {isInRange && attendance.status ? (
          <span
            className={`${styles.statusBadge} ${styles[attendance.status]}`}
          >
            {attendance.status}
          </span>
        ) : (
          <>{setAttendance}</>
        )}
      </span>
    </div>
  );
};
