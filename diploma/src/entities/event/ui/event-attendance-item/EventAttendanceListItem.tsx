import { formatDateRange } from "@shared/libs/date";
import styles from "./EventAttendanceListItem.module.scss";
import { type EventAttendance } from "../../model";
import { formatMinutes } from "@shared/libs/time";

interface EventAttendanceListItemProps {
  attendance: EventAttendance;
  checkIn?: React.ReactNode;
  checkOut?: React.ReactNode;
  disputeAttendance?: React.ReactNode;
}

export const EventAttendanceListItem = ({
  attendance,
  checkIn,
  checkOut,
  disputeAttendance,
}: EventAttendanceListItemProps) => {
  const now = new Date();
  const isInRange =
    now >= new Date(attendance.dateFrom) && now <= new Date(attendance.dateTo);

  const renderAction = () => {
    if (isInRange && attendance.status === "draft") return checkIn;
    if (isInRange && attendance.checkInAt) return checkOut;
    if (!isInRange && attendance.status === "checkedOut")
      return disputeAttendance;
    return null;
  };

  return (
    <div className={styles.eventAttendancelistItemWrapper}>
      <span className={styles.dateCell}>
        {formatDateRange(attendance.dateFrom, attendance.dateTo)}
      </span>
      <span className={styles.descriptionCell}>{attendance.description}</span>
      <span className={styles.minutesCell}>
        {attendance.confirmedMinutes != null
          ? formatMinutes(attendance.confirmedMinutes)
          : "—"}
      </span>
      <span className={styles.statusCell}>
        {attendance.status && (
          <span
            className={`${styles.statusBadge} ${styles[attendance.status]}`}
          >
            {attendance.status}
          </span>
        )}
        {renderAction()}
      </span>
    </div>
  );
};
