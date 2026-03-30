import { ProjectMarker, type Project } from "@entities/project";
import styles from "./OverviewTab.module.scss";
import { CategoriesListWidget } from "@widgets/categories";
import { CategoryTab } from "@entities/category";
import { BaseMap } from "@shared/ui";
import { MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import { useEffect, useRef, useState } from "react";
import type { Coordinates } from "@shared/config/types";

interface OverviewTabProps {
  project?: Project;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ project, userLocation }: OverviewTabProps) => {
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
              <CategoryTab
                className={styles.categoryProject}
                name={category.name}
              />
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
            <h2>Project & Event Locations</h2>
            <p>
              Discover where this project's activities and events are taking
              place across the map.
            </p>
          </div>
          <div className={styles.totalTasks}>
            <h1>TOTAL</h1>
            <h2>TASKS</h2>
            <p className={styles.tasksTotalText}>
              {project?.tasksTotal ?? "0"}
            </p>
          </div>
          <div className={styles.totalEvents}>
            <h1>TOTAL</h1>
            <h2>EVENTS</h2>
            <p className={styles.eventsTotalText}>
              {project?.eventsTotal ?? "0"}
            </p>
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
