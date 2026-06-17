import { Avatar } from "@shared/ui";
import type { OfferBooking } from "../../model";
import styles from "./BookingListItem.module.scss";
import { formatTimeAgo } from "@shared/libs/date";
import { getFullName } from "@entities/user";
import { getProgressStatusLabels } from "@entities/offer/config/progressStatusLabels";
import { useTranslation } from "react-i18next";

interface BookingListItemProps {
  booking: OfferBooking;
  actions?: React.ReactNode;
}

export const BookingListItem = ({ booking, actions }: BookingListItemProps) => {
  const { t } = useTranslation(["timeBank", "common"]);
  const statusLabels = getProgressStatusLabels(t);

  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.time}>{formatTimeAgo(booking.createdAt, t)}</div>
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
            {statusLabels[booking.status] ?? booking.status}
          </span>
        </div>
        <p>{booking.comment}</p>
        {(booking.status === "Cancelled" || booking.status === "Disputed") &&
          booking.resolutionComment && (
            <p className={styles.resolutionComment}>
              {t("bookings.labels.reason")}: {booking.resolutionComment}
            </p>
          )}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};
