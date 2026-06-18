import styles from "./OfferPage.module.scss";
import { Tab } from "@shared/ui";
import {
  LinkButtonWrapper,
  ReadMoreButton,
  ShowMoreItemsButton,
} from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import { Calendar, OnlineIcon, TimeBankIcon } from "@shared/assets/icons/info";
import { Avatar } from "@shared/ui";
import { MapLocationInput } from "@shared/ui/inputs";
import { ActionsIcon } from "@shared/assets/icons/actions";
import { RelatedCategoryCard } from "@entities/category";
import { Arrow } from "@shared/assets/icons/actions";
import { BaseMap } from "@shared/ui";
import { MapResizer, MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { OfferMarker, offerQuery } from "@entities/offer";
import { MapUserLocation } from "@entities/user/profile";
import { useIntersectionReveal } from "@shared/libs/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getFullName } from "@entities/user";
import {
  BookingButton,
  CancelBookingButton,
  CompleteBookingButton,
} from "@features/time-bank";
import { useMapUserLocation } from "@features/map";
import { ReportButton } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";
import { useTranslation } from "react-i18next";

export const OfferPage = () => {
  const { t, i18n } = useTranslation(["timeBank"]);
  const { id } = useParams({ from: "/_masterLayout/offers/$id/" });
  const { data: offer } = useSuspenseQuery(offerQuery.id(id));
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const { coordinates: userLocation } = useMapUserLocation();

  const hasCategories = offer.categories && offer.categories.length > 0;
  const hasSkills = offer.skills && offer.skills.length > 0;

  return (
    <div className={styles.wrapperOfferPage}>
      <motion.div
        className={styles.offerPageHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.offerOwnerInfo}>
          <div className={styles.reportWrapper}>
            <ReportButton
              subjectType={ModerationSubjectType.Offer}
              subjectId={offer.id}
            />
          </div>
          <div className={styles.titleHeader}>
            <h1>{offer.title}</h1>
            <div className={styles.offerMetaInfo}>
              <span className={styles.metaChipOffer}>
                {t("timeBank:offerPage.chips.offer")}
              </span>

              <span
                className={`${styles.metaChip} ${
                  offer.isOnline ? styles.online : styles.offline
                }`}
              >
                <OnlineIcon
                  className={`${styles.statusIcon} ${
                    offer.isOnline ? styles.onlineIcon : styles.offlineIcon
                  }`}
                />
                {offer.isOnline
                  ? t("timeBank:offerPage.chips.online")
                  : t("timeBank:offerPage.chips.offline")}
              </span>

              <span
                className={`${styles.metaChip} ${styles.statusChip} ${offer.isActive ? styles.active : styles.inActive}`}
              >
                {offer.isActive
                  ? t("timeBank:offerPage.chips.active")
                  : t("timeBank:offerPage.chips.inactive")}
              </span>

              {offer.endAt && (
                <span className={`${styles.metaChip} ${styles.calendar}`}>
                  <Calendar className={styles.calendarImg} />
                  <span>
                    {formatDateRange(
                      offer.startAt,
                      offer.endAt,
                      i18n.language as "en" | "ua",
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

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <LinkButtonWrapper
              to="/profile"
              params={{ id: offer.owner.id }}
              className={styles.ownerInfo}
            >
              <Avatar
                src={offer.owner.userAvatar}
                className={styles.ownerAvatar}
                fallback={getFullName(
                  offer.owner.firstName,
                  offer.owner.lastName,
                )}
              />
              <p>{getFullName(offer.owner.firstName, offer.owner.lastName)}</p>
            </LinkButtonWrapper>
          </motion.div>
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
        {!offer.canCancel && !offer.canDispute && (
          <div className={styles.bookingBlock}>
            <BookingButton offerId={id} offerName={offer.title} />
          </div>
        )}
        {offer.hasMyPendingRequest && offer.canCancel && (
          <div className={styles.pendingBlock}>
            <p className={styles.pendingText}>
              {t("timeBank:offerPage.blocks.pendingText")}
            </p>
            <CancelBookingButton
              bookingId={offer.myBookingId}
              variant="prominent"
            />
          </div>
        )}
        {!offer.hasMyPendingRequest &&
          (offer.canCancel || offer.canComplete) && (
            <div className={styles.activeBlock}>
              {offer.canComplete && (
                <CompleteBookingButton bookingId={offer.myBookingId} />
              )}
              {offer.canCancel && (
                <CancelBookingButton
                  bookingId={offer.myBookingId}
                  variant="prominent"
                />
              )}
            </div>
          )}
      </motion.div>

      {hasCategories && (
        <ShowMoreItemsButton
          items={
            offer.categories.map((category) => (
              <RelatedCategoryCard key={category.id} category={category}>
                <LinkButtonWrapper
                  to="/categories/$id"
                  params={{ id: category.id }}
                  className={styles.categoryLinkWrapper}
                >
                  <Arrow className={styles.goToCategory} />
                </LinkButtonWrapper>
              </RelatedCategoryCard>
            )) ?? []
          }
          classNameItems={styles.categoriesOfferList}
          className={styles.wrapperCategories}
          classNameButton={styles.buttonShowMoreCategories}
          initialVisibleCount={4}
          buttonPosition="below"
        />
      )}

      <div className={styles.skillsBlock}>
        <div className={styles.headerSkills}>
          <h1>{t("timeBank:offerPage.blocks.skillsTitle")}</h1>
        </div>
        {hasSkills && (
          <ShowMoreItemsButton
            items={
              offer.skills.map((skill) => (
                <Tab
                  key={skill.name}
                  className={styles.skillWrapper}
                  name={skill.name}
                />
              )) ?? []
            }
            classNameItems={styles.skillsOfferList}
            classNameButton={styles.buttonShowMoreSkills}
            buttonContent={<ActionsIcon className={styles.actions} />}
            initialVisibleCount={7}
          />
        )}
      </div>
      {!offer.isOnline && offer.locationInfo?.address && (
        <div className={styles.mapLocationBlock}>
          <div className={styles.offerPageMainInfo}>
            <div className={styles.headerTextInfo}>
              <div className={styles.offerLocations}>
                <h2>{t("timeBank:offerPage.blocks.locationTitle")}</h2>
                <span>{t("timeBank:offerPage.blocks.locationSubtitle")}</span>
              </div>

              <div className={styles.wrapperLocation}>
                <MapLocationInput
                  variant="entity"
                  label={offer.locationInfo.address}
                />
              </div>
            </div>
          </div>

          <div className={styles.mapWrapper} ref={ref}>
            {offer.location && (
              <BaseMap
                zoom={6}
                center={[offer.location.latitude, offer.location.longitude]}
                classNameWrapper={styles.mapOfferWrapper}
              >
                <MapResizer />
                <>
                  {isVisible && (
                    <MapZoomAnimation coordinates={offer.location} />
                  )}
                  <Marker
                    icon={OfferMarker}
                    position={[
                      offer.location.latitude,
                      offer.location.longitude,
                    ]}
                  >
                    <Popup className={styles.popupContent}>
                      <h3 className={styles.popupOfferTitle}>{offer.title}</h3>
                      <p className={styles.popupOfferLocation}>
                        {t("timeBank:offerPage.map.popupLabel")}
                      </p>
                    </Popup>
                  </Marker>
                </>
                {userLocation && (
                  <MapUserLocation coordinates={userLocation} animate={false} />
                )}
              </BaseMap>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
