import styles from "./OverviewTabJoined.module.scss";
import { BaseMap } from "@shared/ui";
import { MapResizer, MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { EventMarker, type Event } from "@entities/event";
import { Activities } from "@shared/assets/images/entity-information";
import { MapLocationInput } from "@shared/ui/inputs";
import { useIntersectionReveal } from "@shared/libs/hooks";
import { useMediaQuery } from "usehooks-ts";

interface OverviewTabJoinedProps {
  event: Event;
  userLocation?: Coordinates | null;
}

export const OverviewTabJoined = ({
  event,
  userLocation,
}: OverviewTabJoinedProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const isDesktop = useMediaQuery("(min-width: 1050px)");

  return (
    <div className={styles.overviewJoinedWrapper}>
      <div className={styles.mapLocationBlock}>
        <div className={styles.projectJoinedEventMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activityLocation}>
              <h2>Event</h2>
              <span>Location</span>
            </div>
            <div className={styles.wrapperLocation}>
              <MapLocationInput
                variant="entity"
                label={event.locationInfo.address}
              />
            </div>
          </div>
          <div className={styles.activitiesBlock}>
            <div className={styles.totalActivities}>
              <div className={styles.totalTasks}>
                <div className={styles.headerTitle}>
                  <h1>COMPLETED</h1>
                  <h2>TASKS</h2>
                </div>
                <p>{event?.tasksTotal ?? "0"}</p>
              </div>
            </div>
            <div className={styles.activeActivities}>
              <div className={styles.activeTasks}>
                <div className={styles.headerTitle}>
                  <h1>ACTIVE</h1>
                  <h2>TASKS</h2>
                </div>
                <p>{event?.activeTasks ?? "0"}</p>
              </div>
            </div>
            {isDesktop && (
              <div className={styles.activitiesImageBlock}>
                <img src={Activities} alt="activities-image" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.mapWrapper} ref={ref}>
          {event.location && (
            <BaseMap
              zoom={6}
              center={[event.location.latitude, event.location.longitude]}
              classNameWrapper={styles.mapJoinedEventWrapper}
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
