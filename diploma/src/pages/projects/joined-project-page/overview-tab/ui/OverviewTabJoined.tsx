import { ProjectMarker, type Project } from "@entities/project";
import styles from "./OverviewTab.module.scss";
import { BaseMap } from "@shared/ui";
import { MapResizer, MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { Activities } from "@shared/assets/images/entity-information";
import { MapLocationInput } from "@shared/ui/inputs";
import { useIntersectionReveal } from "@shared/libs/hooks";

interface OverviewTabJoinedProps {
  project: Project;
  userLocation?: Coordinates | null;
}

export const OverviewTabJoined = ({
  project,
  userLocation,
}: OverviewTabJoinedProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();

  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.mapLocationBlock}>
        <div className={styles.projectPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activitiesLocations}>
              <h2>Project</h2>
              <span>Location</span>
            </div>
            <div className={styles.wrapperLocation}>
              <MapLocationInput
                variant="entity"
                label={project.locationInfo.address}
              />
            </div>
          </div>
          <div className={styles.activitiesBlock}>
            <div className={styles.totalActivities}>
              <div className={styles.totalEvents}>
                <div className={styles.headerTitle}>
                  <h1>TOTAL</h1>
                  <h2>EVENTS</h2>
                </div>
                <p>{project?.eventsTotal ?? "0"}</p>
              </div>
              <div className={styles.totalTasks}>
                <div className={styles.headerTitle}>
                  <h1>TOTAL</h1>
                  <h2>TASKS</h2>
                </div>
                <p>{project?.tasksTotal ?? "0"}</p>
              </div>
            </div>
            <div className={styles.activeActivities}>
              <div className={styles.completedEvents}>
                <div className={styles.headerTitle}>
                  <h1>COMPLETED</h1>
                  <h2>EVENTS</h2>
                </div>
                <p>{project?.eventsCompleted ?? "0"}</p>
              </div>
              <div className={styles.completedTasks}>
                <div className={styles.headerTitle}>
                  <h1>COMPLETED</h1>
                  <h2>TASKS</h2>
                </div>
                <p>{project?.tasksCompleted ?? "0"}</p>
              </div>
            </div>
            <div className={styles.activitiesImageBlock}>
              <img src={Activities} alt="activities-image" />
            </div>
          </div>
        </div>
        <div ref={ref}>
          {project?.location && (
            <BaseMap
              zoom={6}
              center={[project.location.latitude, project.location.longitude]}
              classNameWrapper={styles.mapProjectWrapper}
            >
              <MapResizer />
              <>
                {isVisible && (
                  <MapZoomAnimation coordinates={project.location} />
                )}
                <Marker
                  icon={ProjectMarker}
                  position={[
                    project.location.latitude,
                    project.location.longitude,
                  ]}
                >
                  <Popup className={styles.popupProject}>
                    <h3 className={styles.popupProjectTitle}>
                      {project.title}
                    </h3>
                    <p className={styles.popupProjectLocation}>
                      📍 Project location
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
