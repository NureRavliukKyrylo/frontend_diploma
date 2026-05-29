import { ProjectMarker, type Project } from "@entities/project";
import styles from "./OverviewTabJoined.module.scss";
import { BaseMap } from "@shared/ui";
import { MapResizer, MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { Activities } from "@shared/assets/images/entity-information";
import { MapLocationInput } from "@shared/ui/inputs";
import { useIntersectionReveal } from "@shared/libs/hooks";
import { useMediaQuery } from "usehooks-ts";

interface OverviewTabJoinedProps {
  project: Project;
  userLocation?: Coordinates | null;
}

export const OverviewTabJoined = ({
  project,
  userLocation,
}: OverviewTabJoinedProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const isDesktop = useMediaQuery("(min-width: 1050px)");

  return (
    <div className={styles.overviewJoinedWrapper}>
      <div className={styles.mapLocationBlock}>
        <div className={styles.projectJoinedPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activityLocation}>
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
            {isDesktop && (
              <div className={styles.activitiesImageBlock}>
                <img src={Activities} alt="activities-image" />
              </div>
            )}
          </div>
        </div>
        <div ref={ref}>
          {project?.location && (
            <BaseMap
              zoom={6}
              center={[project.location.latitude, project.location.longitude]}
              classNameWrapper={styles.mapJoinedProjectWrapper}
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
