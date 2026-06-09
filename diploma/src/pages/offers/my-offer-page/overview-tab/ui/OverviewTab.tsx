import styles from "./OverviewTab.module.scss";
import { Tab } from "@shared/ui";
import { BaseMap } from "@shared/ui";
import { MapResizer, MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { OfferMarker } from "@entities/offer";
import { RelatedCategoryCard } from "@entities/category";
import { LinkButtonWrapper, ShowMoreItemsButton } from "@shared/ui/buttons";
import { Arrow, ActionsIcon } from "@shared/assets/icons/actions";
import { MapLocationInput } from "@shared/ui/inputs";
import { useIntersectionReveal } from "@shared/libs/hooks";
import type { Offer } from "@entities/offer";

interface OverviewTabProps {
  offer: Offer;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ offer, userLocation }: OverviewTabProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const hasCategories = offer.categories && offer.categories.length > 0;
  const hasSkills = offer.skills && offer.skills.length > 0;

  return (
    <div className={styles.overviewWrapper}>
      {hasCategories && (
        <ShowMoreItemsButton
          items={offer.categories.map((category) => (
            <RelatedCategoryCard category={category}>
              <LinkButtonWrapper
                to="/categories/$id"
                params={{ id: category.id }}
                className={styles.categoryLinkWrapper}
              >
                <Arrow className={styles.goToCategory} />
              </LinkButtonWrapper>
            </RelatedCategoryCard>
          ))}
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
            items={offer.skills.map((skill) => (
              <Tab className={styles.skillWrapper} name={skill.name} />
            ))}
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
                <h2>Offer</h2>
                <span>Location</span>
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
