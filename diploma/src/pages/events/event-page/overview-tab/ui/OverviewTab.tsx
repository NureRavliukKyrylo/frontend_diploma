import { ProjectMarker } from "@entities/project";
import styles from "./OverviewTab.module.scss";
import { BaseMap } from "@shared/ui";
import { MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import type { Event } from "@entities/event";
import { Activities } from "@shared/assets/images/entity-information";
import { MapLocationInput } from "@shared/ui/inputs";
import { useIntersectionReveal } from "@shared/libs/hooks";

interface OverviewTabProps {
  event: Event;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ event, userLocation }: OverviewTabProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();

  return (
    <div className={styles.overviewWrapper}>
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
                <p>{event?.tasksTotal ?? "0"}</p>
              </div>
            </div>
            <div className={styles.activitiesImageBlock}>
              <img src={Activities} alt="activities-image" />
            </div>
          </div>
        </div>
        <div className={styles.mapWrapper} ref={ref}>
          {event?.location && (
            <BaseMap
              zoom={6}
              center={[event.location.latitude, event.location.longitude]}
            >
              <>
                {isVisible && <MapZoomAnimation coordinates={event.location} />}
                <Marker
                  icon={ProjectMarker}
                  position={[event.location.latitude, event.location.longitude]}
                >
                  <Popup className={styles.popupProject}>
                    <h3 className={styles.popupProjectTitle}>{event.title}</h3>
                    <p className={styles.popupProjectLocation}>
                      📍 Event location
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
