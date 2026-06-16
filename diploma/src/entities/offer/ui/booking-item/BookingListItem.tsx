import { Avatar } from "@shared/ui";
import type { OfferBooking } from "../../model";
import styles from "./BookingListItem.module.scss";
import { formatTimeAgo } from "@shared/libs/date";
import { getFullName } from "@entities/user";
import { PROGRESS_STATUS_LABELS } from "@entities/offer/config/progressStatusLabels";

interface BookingListItemProps {
  booking: OfferBooking;
  actions?: React.ReactNode;
}

export const BookingListItem = ({ booking, actions }: BookingListItemProps) => {
  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.time}>{formatTimeAgo(booking.createdAt)}</div>
      <Avatar
        className={styles.authorAvatar}
        src={booking.worker.userAvatar}
        fallback={getFullName(
          booking.worker.firstName,
          booking.worker.lastName,
        )}
      />
      <div className={styles.bodyWrapper}>
        <div className={styles.initials}>
          <h1>
            {getFullName(booking.worker.firstName, booking.worker.lastName)}
          </h1>
          <span
            className={`${styles.status} ${styles[booking.status.toLowerCase()]}`}
          >
            {PROGRESS_STATUS_LABELS[booking.status] ?? booking.status}
          </span>
        </div>
        <p>{booking.comment}</p>
        {(booking.status === "Cancelled" || booking.status === "Disputed") &&
          booking.resolutionComment && (
            <p className={styles.resolutionComment}>
              Reason: {booking.resolutionComment}
            </p>
          )}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};
