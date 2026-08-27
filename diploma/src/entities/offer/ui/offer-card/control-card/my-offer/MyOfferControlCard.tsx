import { GroupPeopleIcon, OnlineIcon } from "@shared/assets/icons/info";
import type { Offer } from "../../../../model";
import styles from "./MyOfferControlCard.module.scss";
import { useTranslation } from "react-i18next";

interface MyOfferControlCardProps {
  offer: Offer;
  bottomContent?: React.ReactNode;
  className?: string;
}

export const MyOfferControlCard = ({
  offer,
  bottomContent,
  className,
}: MyOfferControlCardProps) => {
  const { t } = useTranslation("timeBank");

  return (
    <>
      <div
        className={`${styles.myOfferWrapper} ${className ? className : ""} ${offer.isActive ? styles.active : styles.inActive}`}
      >
        <div className={styles.leftContent}>
          <h1>{offer.title}</h1>
          <h2>
            {offer.priceMinutes}
            {t("units.m")} {t("myOffers.labels.cost")}
          </h2>
          <p>{offer.description}</p>
          {offer.isOnline ? (
            <span className={`${styles.status} ${styles.online}`}>
              {t("offers.labels.online")}
            </span>
          ) : (
            <span className={`${styles.status} ${styles.offline}`}>
              {t("offers.labels.offline")}
            </span>
          )}
        </div>
        <div className={styles.rightContent}>
          {offer.isActive ? (
            <span className={`${styles.statusOffer} ${styles.active}`}>
              <OnlineIcon
                className={`${styles.statusOfferIcon} ${styles.activeIcon}`}
              />
              {t("myOffers.status.activeItem")}
            </span>
          ) : (
            <span className={`${styles.statusOffer} ${styles.inActive}`}>
              <OnlineIcon
                className={`${styles.statusOfferIcon} ${styles.inActiveIcon}`}
              />
              {t("myOffers.status.inactiveItem")}
            </span>
          )}
          <div className={styles.totalBookings}>
            <GroupPeopleIcon className={styles.groupPeople} />
            {offer.totalBookings ?? 0} {t("myOffers.labels.bookingsCount")}
          </div>
        </div>
      </div>
      {bottomContent}
    </>
  );
};
