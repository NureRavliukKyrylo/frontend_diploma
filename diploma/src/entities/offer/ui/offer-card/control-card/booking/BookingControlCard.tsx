import { Avatar } from "@shared/ui";
import type { OfferJoined } from "../../../../model";
import styles from "./BookingControlCard.module.scss";
import { getFullName } from "@entities/user";
import { OnlineIcon } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";

interface BookingControlCardProps {
  offer: OfferJoined;
  bottomContent?: React.ReactNode;
}

export const BookingControlCard = ({
  offer,
  bottomContent,
}: BookingControlCardProps) => {
  return (
    <div className={styles.bookingWrapper}>
      <Avatar
        src={offer.owner.userAvatar}
        className={styles.avatar}
        fallback={getFullName(offer.owner.firstName, offer.owner.lastName)}
      />

      <div className={styles.mainContent}>
        <div className={styles.topRow}>
          <h1>{offer.title}</h1>
          <span
            className={`${styles.statusOffer} ${
              offer.status === "inProgress"
                ? styles.inProgress
                : styles.completed
            }`}
          >
            <OnlineIcon className={styles.statusIcon} />
            {offer.status === "inProgress" ? "In progress" : "Completed"}
          </span>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.ownerName}>
            {getFullName(offer.owner.firstName, offer.owner.lastName)}
          </span>
          <span className={styles.dot}>·</span>
          <span className={styles.bookedAt}>
            Booked {formatDateToText(offer.bookedAt.toISOString())}
          </span>
          <span
            className={`${styles.onlineStatus} ${
              offer.isOnline ? styles.online : styles.offline
            }`}
          >
            {offer.isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className={styles.reward}>+{offer.priceMinutes}h</div>
      {bottomContent}
    </div>
  );
};
