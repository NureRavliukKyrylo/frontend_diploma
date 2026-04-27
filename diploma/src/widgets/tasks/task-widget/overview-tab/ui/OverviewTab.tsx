import styles from "./OverviewTab.module.scss";
import { BaseMap } from "@shared/ui";
import { MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { EventMarker, EventPopupContent } from "@entities/event";
import { Activities } from "@shared/assets/images/entity-information";
import { useIntersectionReveal } from "@shared/libs/hooks";
import { ProjectMarker, ProjectPopupContent } from "@entities/project";
import type { Task } from "@entities/task";

interface OverviewTabProps {
  task: Task;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ task, userLocation }: OverviewTabProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const mapCenter = task.event?.location ?? task.project?.location;
  const hasLocation = !!(task?.event?.location || task?.project?.location);

  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.skillsBlock}></div>
      {hasLocation && (
        <div className={styles.mapLocationBlock}>
          <div className={styles.projectPageMainInfo}>
            <div className={styles.headerTextInfo}>
              <div className={styles.activitiesLocations}>
                <h2>Activities</h2>
                <span>Locations</span>
              </div>
              <p>
                Explore all related activities within this task and see where
                they are located
              </p>
            </div>
            <div className={styles.activitiesImageBlock}>
              <img src={Activities} alt="activities-image" />
            </div>
          </div>
          <div className={styles.mapWrapper} ref={ref}>
            {mapCenter && (
              <BaseMap
                zoom={6}
                center={[mapCenter.latitude, mapCenter.longitude]}
              >
                <>
                  {isVisible && <MapZoomAnimation coordinates={mapCenter} />}

                  {task.event?.location && (
                    <Marker
                      icon={EventMarker}
                      position={[
                        task.event.location.latitude,
                        task.event.location.longitude,
                      ]}
                    >
                      <Popup className={styles.popupContent}>
                        <div className={styles.popupLabel}>Related event</div>
                        <EventPopupContent event={task.event} />
                      </Popup>
                    </Marker>
                  )}

                  {task.project?.location && (
                    <Marker
                      icon={ProjectMarker}
                      position={[
                        task.project.location.latitude,
                        task.project.location.longitude,
                      ]}
                    >
                      <Popup className={styles.popupContent}>
                        <div className={styles.popupLabel}>Related project</div>
                        <ProjectPopupContent project={task.project} />
                      </Popup>
                    </Marker>
                  )}

                  {userLocation && (
                    <MapUserLocation
                      coordinates={userLocation}
                      animate={false}
                    />
                  )}
                </>
              </BaseMap>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
