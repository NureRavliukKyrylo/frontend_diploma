import styles from "./MyOfferPage.module.scss";
import { Toggle } from "@shared/ui";
import { ReadMoreButton } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import { Calendar, OnlineIcon, TimeBankIcon } from "@shared/assets/icons/info";
import { myOfferMainTabs } from "../config/myOfferTab";
import { useMyOfferPage } from "../model/useMyOfferPage";

export const MyOfferPage = () => {
  const { offer, tab, forms, handleTabChange } = useMyOfferPage();

  return (
    <div className={styles.wrapperOfferPage}>
      <motion.div
        className={styles.offerPageHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.offerOwnerInfo}>
          <div className={styles.titleHeader}>
            <h1>{offer.title}</h1>
            <div className={styles.offerMetaInfo}>
              <span className={styles.metaChipOffer}>Offer</span>

              <span
                className={`${styles.metaChip} ${offer.isOnline ? styles.online : styles.offline}`}
              >
                <OnlineIcon
                  className={`${styles.statusIcon} ${offer.isOnline ? styles.onlineIcon : styles.offlineIcon}`}
                />
                {offer.isOnline ? "Online" : "Offline"}
              </span>

              <span
                className={`${styles.metaChip} ${styles.statusChip} ${offer.isActive ? styles.active : styles.inActive}`}
              >
                {offer.isActive ? "Active" : "Inactive"}
              </span>

              {offer.endAt && (
                <span className={`${styles.metaChip} ${styles.calendar}`}>
                  <Calendar className={styles.calendarImg} />
                  <span>{formatDateRange(offer.startAt, offer.endAt)}</span>
                </span>
              )}

              <span className={`${styles.metaChip} ${styles.reward}`}>
                <TimeBankIcon className={styles.timeBankIcon} />
                <span>{offer.priceMinutes}m</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.offerFooterContent}>
          <ReadMoreButton
            collapsedHeight={90}
            className={styles.readMoreButtonContainer}
            classNameButton={styles.readMoreButtonOffer}
          >
            <p>{offer.description}</p>
          </ReadMoreButton>
        </div>
      </motion.div>

      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={myOfferMainTabs}
          activeValue={tab}
          onChange={handleTabChange}
          buttonClassName={styles.toggleOfferButton}
          activeButtonClassName={styles.toggleOfferButtonActive}
          className={styles.toggleOffer}
          pillClassName={styles.toggleOfferPill}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {forms[tab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
