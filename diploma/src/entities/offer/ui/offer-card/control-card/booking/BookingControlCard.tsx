import { Avatar } from "@shared/ui";
import type { OfferJoined } from "../../../../model";
import styles from "./BookingControlCard.module.scss";
import { getFullName } from "@entities/user";
import { OnlineIcon } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";
import { getProgressStatusLabels } from "@entities/offer/config/progressStatusLabels";

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
  const { t } = useTranslation("timeBank");
  const statusLabels = getProgressStatusLabels(t);

  return (
    <>
      <div
        className={`${styles.bookingWrapper} ${className ? className : ""} ${styles[offer.myBookingStatus.toLowerCase()]}`}
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
                {t("bookings.labels.booked")}{" "}
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
              {offer.isOnline
                ? t("offers.labels.online")
                : t("offers.labels.offline")}
            </span>
          </div>
        </div>

        <div className={styles.rightContent}>
          <span
            className={`${styles.statusOffer} ${styles[offer.myBookingStatus.toLowerCase()]}`}
          >
            <OnlineIcon className={styles.statusIcon} />
            {statusLabels[offer.myBookingStatus] ?? t("offers.labels.unknown")}
          </span>
          <div
            className={`${styles.reward} ${styles[offer.myBookingStatus.toLowerCase()]}`}
          >
            +{offer.priceMinutes}
            {t("units.m")}
          </div>
        </div>
      </div>
      {bottomContent}
    </>
  );
};
