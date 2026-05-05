import styles from "./OverviewTab.module.scss";
import { BaseMap, Tab } from "@shared/ui";
import { MapZoomAnimation } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { MapUserLocation } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { EventMarker, EventPopupContent } from "@entities/event";
import { Activities } from "@shared/assets/images/entity-information";
import { useIntersectionReveal } from "@shared/libs/hooks";
import { ProjectMarker, ProjectPopupContent } from "@entities/project";
import type { Task } from "@entities/task";
import { LinkButtonWrapper, ShowMoreItemsButton } from "@shared/ui/buttons";
import { RelatedCategoryCard } from "@entities/category";
import { ActionsIcon, Arrow } from "@shared/assets/icons/actions";

interface OverviewTabProps {
  task: Task;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ task, userLocation }: OverviewTabProps) => {
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const mapCenter = task.event?.location ?? task.project?.location;
  const hasLocation = !!(task?.event?.location || task?.project?.location);
  const hasCategories = task?.categories && task?.categories.length > 0;
  const hasSkills = task?.skills && task?.skills.length > 0;

  return (
    <div className={styles.overviewWrapper}>
      {hasCategories ? (
        <ShowMoreItemsButton
          items={
            task?.categories?.map((category) => (
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
          classNameItems={styles.categoriesTaskList}
          className={styles.wrapperCategories}
          classNameButton={styles.buttonShowMoreCategories}
          initialVisibleCount={3}
          buttonPosition="below"
        />
      ) : (
        <p className={styles.noCategoriesText}>
          This task hasn't set any categories yet.
        </p>
      )}
      <div className={styles.skillsBlock}>
        <div className={styles.headerSkills}>
          <h1>TASK Skills</h1>
        </div>
        {hasSkills ? (
          <ShowMoreItemsButton
            items={
              task?.skills?.map((skill) => (
                <Tab className={styles.skillWrapper} name={skill.name} />
              )) ?? []
            }
            classNameItems={styles.skillsTaskList}
            classNameButton={styles.buttonShowMoreSkills}
            buttonContent={<ActionsIcon className={styles.actions} />}
            initialVisibleCount={7}
          />
        ) : (
          <p className={styles.noSkillsText}>
            This task doesn't require any skills.
          </p>
        )}
      </div>
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
