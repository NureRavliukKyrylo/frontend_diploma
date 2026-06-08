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
import { BookingButton } from "@features/time-bank";
import { useMapUserLocation } from "@features/map";

export const OfferPage = () => {
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
          <div className={styles.titleHeader}>
            <h1>{offer.title}</h1>
            <div className={styles.offerMetaInfo}>
              <span className={styles.metaChipOffer}>Offer</span>

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
                  <span>
                    {formatDateRange(
                      offer.startAt,
                      offer.endAt,
                      undefined,
                      false,
                    )}
                  </span>
                </span>
              )}

              <span className={`${styles.metaChip} ${styles.reward}`}>
                <TimeBankIcon className={styles.timeBankIcon} />
                <span>{offer.priceMinutes}m</span>
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
        <div className={styles.actionsButton}>
          <BookingButton offerId={id} offerName={offer.title} />
        </div>
      </motion.div>

      {hasCategories && (
        <ShowMoreItemsButton
          items={
            offer.categories.map((category) => (
              <RelatedCategoryCard category={category}>
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
          <h1>Offer Skills</h1>
        </div>
        {hasSkills && (
          <ShowMoreItemsButton
            items={
              offer.skills.map((skill) => (
                <Tab className={styles.skillWrapper} name={skill.name} />
              )) ?? []
            }
            classNameItems={styles.skillsOfferList}
            classNameButton={styles.buttonShowMoreSkills}
            buttonContent={<ActionsIcon className={styles.actions} />}
            initialVisibleCount={7}
          />
        )}
      </div>

      <div className={styles.mapLocationBlock}>
        <div className={styles.offerPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.offerLocations}>
              <h2>Offer</h2>
              <span>Location</span>
            </div>
            {!offer.isOnline && offer.locationInfo?.address && (
              <div className={styles.wrapperLocation}>
                <MapLocationInput
                  variant="entity"
                  label={offer.locationInfo.address}
                />
              </div>
            )}
            {offer.isOnline && (
              <p className={styles.onlineNote}>This offer is held online</p>
            )}
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
                {isVisible && <MapZoomAnimation coordinates={offer.location} />}
                <Marker
                  icon={OfferMarker}
                  position={[offer.location.latitude, offer.location.longitude]}
                >
                  <Popup className={styles.popupContent}>
                    <h3 className={styles.popupOfferTitle}>{offer.title}</h3>
                    <p className={styles.popupOfferLocation}>
                      📍 Offer location
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
    </div>
  );
};
