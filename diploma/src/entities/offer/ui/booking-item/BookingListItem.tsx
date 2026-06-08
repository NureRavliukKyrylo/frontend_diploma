import { Avatar } from "@shared/ui";
import type { OfferBooking } from "../../model";
import styles from "./BookingListItem.module.scss";
import { formatTimeAgo } from "@shared/libs/date";
import { getFullName } from "@entities/user";

interface BookingListItemProps {
  booking: OfferBooking;
}

export const BookingListItem = ({ booking }: BookingListItemProps) => {
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
            {booking.status}
          </span>
        </div>
        <p>{booking.comment}</p>
      </div>
    </div>
  );
};
