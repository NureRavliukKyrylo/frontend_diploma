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

interface OverviewTabProps {
  event: Event;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ event, userLocation }: OverviewTabProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const hasCategories = event?.categories && event?.categories.length > 0;
  const hasSkills = event?.skills && event?.skills.length > 0;
  return (
    <div className={styles.overviewWrapper}>
      {hasCategories && (
        <ShowMoreItemsButton
          items={
            event?.categories?.map((category) => (
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
          classNameItems={styles.categoriesEventList}
          className={styles.wrapperCategories}
          classNameButton={styles.buttonShowMoreCategories}
          initialVisibleCount={4}
          buttonPosition="below"
        />
      )}
      <div className={styles.skillsBlock}>
        <div className={styles.headerSkills}>
          <h1>EVENT Skills</h1>
        </div>
        {hasSkills && (
          <ShowMoreItemsButton
            items={
              event?.skills.map((skill) => (
                <Tab className={styles.skillWrapper} name={skill.name} />
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
        <div className={styles.projectPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activitiesLocations}>
              <h2>Activities</h2>
              <span>Locations</span>
            </div>
            <p>
              Explore all tasks within this event and see where they are located
            </p>
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
                  <h1>ACTIVE</h1>
                  <h2>TASKS</h2>
                </div>
                <p>{event?.activeTasks ?? "0"}</p>
              </div>
            </div>
            <div className={styles.activitiesImageBlock}>
              <img src={Activities} alt="activities-image" />
            </div>
          </div>
        </div>
        <div className={styles.mapWrapper} ref={ref}>
          {event.location && (
            <BaseMap
              zoom={6}
              center={[event.location.latitude, event.location.longitude]}
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
                      📍 Event location
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
                    <div className={styles.popupLabel}>Related project</div>
                    <ProjectPopupContent project={event.project} />
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
