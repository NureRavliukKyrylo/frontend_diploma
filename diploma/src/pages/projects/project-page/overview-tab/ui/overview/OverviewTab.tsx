import { ProjectMarker, type Project } from "@entities/project";
import styles from "./OverviewTab.module.scss";
import { CategoriesListWidget } from "@widgets/categories";
import { BaseMap, Tab } from "@shared/ui";
import { MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import { useEffect, useRef, useState } from "react";
import type { Coordinates } from "@shared/config/types";
import { EventClusters } from "../event-cluster/EventClusters";
import type { Event } from "@entities/event";
import { Activities } from "@shared/assets/images/entity-information";

interface OverviewTabProps {
  project: Project;
  events?: Event[];
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({
  project,
  userLocation,
  events,
}: OverviewTabProps) => {
  const hasCategories = project?.categories && project?.categories.length > 0;
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (mapRef.current) observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.categoriesBlock}>
        <h1>CATEGORIES</h1>
        {hasCategories ? (
          <CategoriesListWidget
            renderCard={(category) => (
              <Tab className={styles.categoryProject} name={category.name} />
            )}
            className={styles.categoriesProjectList}
            categories={project?.categories}
          />
        ) : (
          <p className={styles.noCategoriesText}>
            This project hasn't set any categories yet.
          </p>
        )}
      </div>
      <div className={styles.mapLocationBlock}>
        <div className={styles.projectPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activitiesLocations}>
              <h2>Activities</h2>
              <span>Locations</span>
            </div>
            <p>
              Explore all tasks within this project and see where they are
              located
            </p>
          </div>
          <div className={styles.activitiesBlock}>
            <div className={styles.activeActivities}>
              <div className={styles.totalEvents}>
                <div className={styles.headerTitle}>
                  <h1>ACTIVE</h1>
                  <h2>EVENTS</h2>
                </div>
                <p>{project?.eventsTotal ?? "0"}</p>
              </div>
              <div className={styles.totalTasks}>
                <div className={styles.headerTitle}>
                  <h1>ACTIVE</h1>
                  <h2>TASKS</h2>
                </div>
                <p>{project?.tasksTotal ?? "0"}</p>
              </div>
            </div>
            <div className={styles.activitiesImageBlock}>
              <img src={Activities} alt="activities-image" />
            </div>
          </div>
        </div>
        <div className={styles.mapWrapper} ref={mapRef}>
          {project?.location && (
            <BaseMap
              zoom={6}
              center={[project.location.latitude, project.location.longitude]}
            >
              <>
                {mapVisible && (
                  <MapZoomAnimation
                    coordinates={project.location}
                    onAnimationEnd={() => setMapVisible(false)}
                  />
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
              {events && <EventClusters data={events} />}
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
