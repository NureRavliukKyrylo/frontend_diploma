import { Avatar } from "@shared/ui";
import type { Offer } from "../../../model";
import styles from "./OfferListItem.module.scss";
import { getFullName } from "@entities/user";
import { Calendar, OnlineIcon } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";

interface OfferListItemProps {
  offer: Offer;
  bottomContent?: React.ReactNode;
}

export const OfferListItem = ({ offer, bottomContent }: OfferListItemProps) => {
  const { t, i18n } = useTranslation("timeBank");

  return (
    <div className={styles.offerWrapper}>
      <div className={styles.topContent}>
        <div className={styles.ownerContent}>
          <Avatar
            src={offer.owner.userAvatar}
            className={styles.ownerAvatar}
            fallback={getFullName(offer.owner.firstName, offer.owner.lastName)}
          />
          <div className={styles.initials}>
            <h1>{getFullName(offer.owner.firstName, offer.owner.lastName)}</h1>
            {offer.isOnline ? (
              <span>
                <OnlineIcon className={`${styles.status} ${styles.online}`} />
                {t("offers.labels.online")}
              </span>
            ) : (
              <span>
                <OnlineIcon className={`${styles.status} ${styles.offline}`} />
                {t("offers.labels.offline")}
              </span>
            )}
          </div>
        </div>
        <div className={styles.reward}>
          <h1>
            {offer.priceMinutes}
            {t("units.m")}
          </h1>
          <h2>{t("offers.labels.reward")}</h2>
        </div>
      </div>
      <div className={styles.title}>
        <h1>{offer.title}</h1>
      </div>
      <div className={styles.description}>
        <p>{offer.description}</p>
      </div>
      <div className={styles.deadlineBlock}>
        <Calendar className={styles.calendarOffer} />
        <span>
          {formatDateToText(
            new Date(offer.endAt).toISOString(),
            i18n.language as "en" | "uk",
          )}
        </span>
      </div>
      <div className={styles.dividerLine} />
      {bottomContent}
    </div>
  );
};
