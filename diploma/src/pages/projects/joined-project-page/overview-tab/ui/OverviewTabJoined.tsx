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
import { useTranslation } from "react-i18next";

interface OverviewTabJoinedProps {
  project: Project;
  userLocation?: Coordinates | null;
}

export const OverviewTabJoined = ({
  project,
  userLocation,
}: OverviewTabJoinedProps) => {
  const { t } = useTranslation(["project"]);
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const isDesktop = useMediaQuery("(min-width: 1050px)");

  return (
    <div className={styles.overviewJoinedWrapper}>
      <div className={styles.mapLocationBlock}>
        <div className={styles.projectJoinedPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activityLocation}>
              <h2>{t("project:overview.map.project")}</h2>
              <span>{t("project:overview.map.location")}</span>
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
                  <h1>{t("project:overview.total")}</h1>
                  <h2>{t("project:overview.events")}</h2>
                </div>
                <p>{project?.eventsTotal ?? "0"}</p>
              </div>
              <div className={styles.totalTasks}>
                <div className={styles.headerTitle}>
                  <h1>{t("project:overview.total")}</h1>
                  <h2>{t("project:overview.tasks")}</h2>
                </div>
                <p>{project?.tasksTotal ?? "0"}</p>
              </div>
            </div>
            <div className={styles.activeActivities}>
              <div className={styles.completedEvents}>
                <div className={styles.headerTitle}>
                  <h1>{t("project:overview.completed")}</h1>
                  <h2>{t("project:overview.events")}</h2>
                </div>
                <p>{project?.eventsCompleted ?? "0"}</p>
              </div>
              <div className={styles.completedTasks}>
                <div className={styles.headerTitle}>
                  <h1>{t("project:overview.completed")}</h1>
                  <h2>{t("project:overview.tasks")}</h2>
                </div>
                <p>{project?.tasksCompleted ?? "0"}</p>
              </div>
            </div>
            {isDesktop && (
              <div className={styles.activitiesImageBlock}>
                <img
                  src={Activities}
                  alt={t("project:images.activities")}
                />
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
                      {t("project:overview.map.markerPopup")}
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
