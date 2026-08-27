import styles from "./OverviewTab.module.scss";
import { BaseMap, Tab } from "@shared/ui";
import { MapResizer, MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { EventMarker, type Event } from "@entities/event";
import { Activities } from "@shared/assets/images/entity-information";
import { MapLocationInput } from "@shared/ui/inputs";
import { useIntersectionReveal } from "@shared/libs/hooks";
import { ProjectMarker, ProjectPopupContent } from "@entities/project";
import { LinkButtonWrapper, ShowMoreItemsButton } from "@shared/ui/buttons";
import { RelatedCategoryCard } from "@entities/category";
import { ActionsIcon, Arrow } from "@shared/assets/icons/actions";
import { useMediaQuery } from "usehooks-ts";
import { useTranslation } from "react-i18next";

interface OverviewTabProps {
  event: Event;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ event, userLocation }: OverviewTabProps) => {
  const { t } = useTranslation(["event"]);
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const hasCategories = event?.categories && event?.categories.length > 0;
  const hasSkills = event?.skills && event?.skills.length > 0;
  const isDesktop = useMediaQuery("(min-width: 1050px)");

  return (
    <div className={styles.overviewWrapper}>
      {hasCategories && (
        <ShowMoreItemsButton
          items={
            event?.categories?.map((category) => (
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
          classNameItems={styles.categoriesEventList}
          className={styles.wrapperCategories}
          classNameButton={styles.buttonShowMoreCategories}
          initialVisibleCount={4}
          buttonPosition="below"
        />
      )}
      <div className={styles.skillsBlock}>
        <div className={styles.headerSkills}>
          <h1>{t("event:labels.skills")}</h1>
        </div>
        {hasSkills && (
          <ShowMoreItemsButton
            items={
              event?.skills.map((skill) => (
                <Tab
                  key={skill.name}
                  className={styles.skillWrapper}
                  name={skill.name}
                />
              )) ?? []
            }
            classNameItems={styles.skillsTaskList}
            classNameButton={styles.buttonShowMoreSkills}
            buttonContent={<ActionsIcon className={styles.actions} />}
            initialVisibleCount={7}
          />
        )}
      </div>
      <div className={styles.skillsBlock}></div>
      <div className={styles.mapLocationBlock}>
        <div className={styles.eventPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activitiesLocations}>
              <h2>{t("event:labels.activities")}</h2>
              <span>{t("event:labels.locations")}</span>
            </div>
            <p>{t("event:labels.subtitle")}</p>
            <div className={styles.wrapperLocation}>
              <MapLocationInput
                variant="entity"
                label={event.locationInfo.address}
              />
            </div>
          </div>
          <div className={styles.activitiesBlock}>
            <div className={styles.activeActivities}>
              <div className={styles.totalTasks}>
                <div className={styles.headerTitle}>
                  <h1>{t("event:labels.completed")}</h1>
                  <h2>{t("event:labels.tasks")}</h2>
                </div>
                <p>{event?.activeTasks ?? "0"}</p>
              </div>
            </div>
            {isDesktop && (
              <div className={styles.activitiesImageBlock}>
                <img src={Activities} alt={t("event:images.activities")} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.mapWrapper} ref={ref}>
          {event.location && (
            <BaseMap
              zoom={6}
              center={[event.location.latitude, event.location.longitude]}
              classNameWrapper={styles.mapEventWrapper}
            >
              <MapResizer />
              <>
                {isVisible && <MapZoomAnimation coordinates={event.location} />}
                <Marker
                  icon={EventMarker}
                  position={[event.location.latitude, event.location.longitude]}
                >
                  <Popup className={styles.popupContent}>
                    <h3 className={styles.popupEventTitle}>{event.title}</h3>
                    <p className={styles.popupEventLocation}>
                      📍 {t("event:labels.markerLocation")}
                    </p>
                  </Popup>
                </Marker>
              </>
              {event.project && (
                <Marker
                  icon={ProjectMarker}
                  position={[
                    event.project.location.latitude,
                    event.project.location.longitude,
                  ]}
                >
                  <Popup className={styles.popupContent}>
                    <div className={styles.popupLabel}>
                      {t("event:labels.relatedProject")}
                    </div>
                    <ProjectPopupContent
                      project={event.project}
                      organizationTitle={event.organization?.name}
                    />
                  </Popup>
                </Marker>
              )}
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
