import { ProjectMarker, type Project } from "@entities/project";
import styles from "./OverviewTab.module.scss";
import { BaseMap } from "@shared/ui";
import { MapResizer, MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { EventClusters } from "../event-cluster/EventClusters";
import type { Event } from "@entities/event";
import { Activities } from "@shared/assets/images/entity-information";
import { MapLocationInput } from "@shared/ui/inputs";
import { useIntersectionReveal } from "@shared/libs/hooks";
import { RelatedCategoryCard } from "@entities/category";
import { LinkButtonWrapper, ShowMoreItemsButton } from "@shared/ui/buttons";
import { Arrow } from "@shared/assets/icons/actions";
import { useMediaQuery } from "usehooks-ts";

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
  const isDesktop = useMediaQuery("(min-width: 1050px)");
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();

  return (
    <div className={styles.overviewWrapper}>
      {hasCategories && (
        <ShowMoreItemsButton
          items={
            project?.categories?.map((category) => (
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
          classNameItems={styles.categoriesProjectList}
          className={styles.wrapperCategories}
          classNameButton={styles.buttonShowMore}
          initialVisibleCount={4}
          buttonPosition="below"
        />
      )}
      <div className={styles.mapLocationBlock}>
        <div className={styles.projectPageMainInfo}>
          <div className={styles.headerTextInfo}>
            <div className={styles.activitiesLocations}>
              <h2>Activities</h2>
              <span>Locations</span>
            </div>
            <p>
              Explore all activities within this project and see where they are
              located
            </p>
            <div className={styles.wrapperLocation}>
              <MapLocationInput
                variant="entity"
                label={project.locationInfo.address}
              />
            </div>
          </div>
          <div className={styles.activitiesBlock}>
            <div className={styles.activeActivities}>
              <div className={styles.totalEvents}>
                <div className={styles.headerTitle}>
                  <h1>COMPLETED</h1>
                  <h2>EVENTS</h2>
                </div>
                <p>{project?.eventsCompleted ?? "0"}</p>
              </div>
              <div className={styles.totalTasks}>
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
