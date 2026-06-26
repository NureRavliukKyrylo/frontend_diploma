import { formatDateRange, formatDateToText } from "@shared/libs/date";
import styles from "./EventAttendanceListItem.module.scss";
import { type EventAttendance } from "../../model";
import { formatMinutes } from "@shared/libs/time";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation(["event"]);
  const now = new Date();
  const isInRange =
    now >= new Date(attendance.currentAttendance.dateFrom) &&
    now <= new Date(attendance.currentAttendance.dateTo);

  const renderAction = () => {
    if (attendance.canCheckIn) return checkIn;
    if (attendance.canCheckOut) return checkOut;
    if (!isInRange && attendance.currentAttendance.checkOutAt !== null)
      return disputeAttendance;
    return null;
  };

  return (
    <div className={styles.eventAttendanceListItemWrapper}>
      <span className={styles.dateCell}>
        {attendance.currentAttendance.checkOutAt
          ? formatDateToText(
              attendance.currentAttendance.checkOutAt as string,
              i18n.language as "en" | "uk",
              true,
            )
          : attendance.currentAttendance.checkInAt
            ? formatDateToText(
                attendance.currentAttendance.checkInAt as string,
                i18n.language as "en" | "uk",
                true,
              )
            : formatDateRange(
                attendance.currentAttendance.dateFrom,
                attendance.currentAttendance.dateTo,
                i18n.language as "en" | "uk",
                true,
              )}
      </span>
      <span className={styles.descriptionCell}>
        {attendance.currentAttendance.description}
      </span>
      <span className={styles.minutesCell}>
        {attendance.currentAttendance.confirmedMinutes != null
          ? formatMinutes(attendance.currentAttendance.confirmedMinutes)
          : "—"}
      </span>
      <span className={styles.statusCell}>
        {attendance.currentAttendance.status && !renderAction() && (
          <span
            className={`${styles.statusBadge} ${styles[attendance.currentAttendance.status]}`}
          >
            {t(
              `event:attendance.statuses.${attendance.currentAttendance.status}`,
              {
                defaultValue: attendance.currentAttendance.status,
              },
            )}
          </span>
        )}
        {renderAction()}
      </span>
    </div>
  );
};
