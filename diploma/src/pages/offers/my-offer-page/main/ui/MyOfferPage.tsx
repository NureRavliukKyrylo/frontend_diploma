import styles from "./MyOfferPage.module.scss";
import { Avatar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import { Calendar, OnlineIcon, TimeBankIcon } from "@shared/assets/icons/info";
import { getMyOfferMainTabs } from "../config/myOfferTab"; // Updated import
import { useMyOfferPage } from "../model/useMyOfferPage";
import {
  CancelBookingButton,
  CompleteBookingButton,
} from "@features/time-bank";
import { getFullName } from "@entities/user";
import { useTranslation } from "react-i18next";

export const MyOfferPage = () => {
  const { t, i18n } = useTranslation(["timeBank"]);
  const { offer, tab, forms, handleTabChange } = useMyOfferPage();

  const tabs = getMyOfferMainTabs(t);

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
              <span className={styles.metaChipOffer}>
                {t("timeBank:myOfferPage.chips.myOffer")}
              </span>

              <span
                className={`${styles.metaChip} ${offer.isOnline ? styles.online : styles.offline}`}
              >
                <OnlineIcon
                  className={`${styles.statusIcon} ${offer.isOnline ? styles.onlineIcon : styles.offlineIcon}`}
                />
                {offer.isOnline
                  ? t("timeBank:myOfferPage.chips.online")
                  : t("timeBank:myOfferPage.chips.offline")}
              </span>

              <span
                className={`${styles.metaChip} ${styles.statusChip} ${offer.isActive ? styles.active : styles.inActive}`}
              >
                {offer.isActive
                  ? t("timeBank:myOfferPage.chips.active")
                  : t("timeBank:myOfferPage.chips.inactive")}
              </span>

              {offer.endAt && (
                <span className={`${styles.metaChip} ${styles.calendar}`}>
                  <Calendar className={styles.calendarImg} />
                  <span>
                    {formatDateRange(
                      offer.startAt,
                      offer.endAt,
                      i18n.language as "en" | "uk",
                      true,
                    )}
                  </span>
                </span>
              )}

              <span className={`${styles.metaChip} ${styles.reward}`}>
                <TimeBankIcon className={styles.timeBankIcon} />
                <span>
                  {offer.priceMinutes}
                  {t("timeBank:units.m")}
                </span>
              </span>
            </div>
          </div>
          {offer.worker && (
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <LinkButtonWrapper
                to="/profile"
                params={{ id: offer.worker.id }}
                className={styles.workerInfo}
              >
                <Avatar
                  src={offer.worker.userAvatar}
                  className={styles.workerAvatar}
                  fallback={getFullName(
                    offer.worker.firstName,
                    offer.worker.lastName,
                  )}
                />
                <p>
                  {getFullName(offer.worker.firstName, offer.worker.lastName)}
                </p>
              </LinkButtonWrapper>
            </motion.div>
          )}
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
        {(offer.canComplete || offer.canCancel) && (
          <div className={styles.offerActions}>
            {offer.canComplete && (
              <CompleteBookingButton bookingId={offer.reservedBookingId} />
            )}
            {offer.canCancel && (
              <CancelBookingButton
                bookingId={offer.reservedBookingId}
                variant="prominent"
              />
            )}
          </div>
        )}
      </motion.div>

      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={tabs}
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
