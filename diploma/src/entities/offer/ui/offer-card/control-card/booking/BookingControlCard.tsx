import { Avatar } from "@shared/ui";
import type { OfferJoined } from "../../../../model";
import styles from "./BookingControlCard.module.scss";
import { getFullName } from "@entities/user";
import { OnlineIcon } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";

interface BookingControlCardProps {
  offer: OfferJoined;
  bottomContent?: React.ReactNode;
  className?: string;
}

export const BookingControlCard = ({
  offer,
  bottomContent,
  className,
}: BookingControlCardProps) => {
  return (
    <>
      <div
        className={`${styles.bookingWrapper} ${className ? className : ""} ${styles[offer.progressStatus]}`}
      >
        <Avatar
          src={offer.owner.userAvatar}
          className={styles.avatar}
          fallback={getFullName(offer.owner.firstName, offer.owner.lastName)}
        />

        <div className={styles.mainContent}>
          <div className={styles.topRow}>
            <h1>{offer.title}</h1>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.ownerInfo}>
              <span className={styles.ownerName}>
                {getFullName(offer.owner.firstName, offer.owner.lastName)}
              </span>
              <span className={styles.dot}>|</span>
              <span className={styles.bookedAt}>
                Booked{" "}
                {formatDateToText(
                  new Date(offer.lastBookedAt).toISOString(),
                  false,
                )}
              </span>
            </div>
            <span
              className={`${styles.onlineStatus} ${
                offer.isOnline ? styles.online : styles.offline
              }`}
            >
              {offer.isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <div className={styles.rightContent}>
          <span
            className={`${styles.statusOffer} ${styles[offer.progressStatus]}`}
          >
            <OnlineIcon className={styles.statusIcon} />
            {
              {
                pending: "Pending",
                inProgress: "In progress",
                completed: "Completed",
                cancelled: "Cancelled",
              }[offer.progressStatus]
            }
          </span>
          <div className={`${styles.reward} ${styles[offer.progressStatus]}`}>
            +{offer.priceMinutes}m
          </div>
        </div>
      </div>
      {bottomContent}
    </>
  );
};
