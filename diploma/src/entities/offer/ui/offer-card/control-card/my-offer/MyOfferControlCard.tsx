import { GroupPeopleIcon, OnlineIcon } from "@shared/assets/icons/info";
import type { Offer } from "../../../model";
import styles from "./MyOfferControlCard.module.scss";

interface MyOfferControlCardProps {
  offer: Offer;
  bottomContent?: React.ReactNode;
}
export const MyOfferControlCard = ({
  offer,
  bottomContent,
}: MyOfferControlCardProps) => {
  <div
    className={`${styles.myOfferWrapper} ${offer.isActive ? styles.active : styles.inActive}`}
  >
    <div className={styles.leftContent}>
      <h1>{offer.title}</h1>
      <h2>{offer.priceMinutes}m cost</h2>
      <p>{offer.description}</p>
      {offer.isOnline ? (
        <span className={`${styles.status} ${styles.online}`}>Online</span>
      ) : (
        <span className={`${styles.status} ${styles.offline}`}>Offline</span>
      )}
    </div>
    <div className={styles.rightContent}>
      {offer.isActive ? (
        <span className={`${styles.statusOffer} ${styles.active}`}>
          <OnlineIcon
            className={`${styles.statusOfferIcon} ${styles.activeIcon}`}
          />
          Active
        </span>
      ) : (
        <span className={`${styles.statusOffer} ${styles.inActive}`}>
          <OnlineIcon
            className={`${styles.statusOfferIcon} ${styles.inActiveIcon}`}
          />
          InActive
        </span>
      )}
      <div className={styles.totalBookings}>
        <GroupPeopleIcon className={styles.groupPeople} />
        {offer.totalBookings ?? 0} bookings
      </div>
    </div>
  </div>;
};
