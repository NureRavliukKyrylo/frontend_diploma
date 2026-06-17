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
import { useTranslation } from "react-i18next";

interface OverviewTabProps {
  task: Task;
  userLocation?: Coordinates | null;
}

export const OverviewTab = ({ task, userLocation }: OverviewTabProps) => {
  const { t } = useTranslation(["task"]);
  const { isVisible, ref } = useIntersectionReveal<HTMLDivElement>();
  const mapCenter = task.event?.location ?? task.project?.location;
  const hasLocation = !!(task?.event?.location || task?.project?.location);
  const hasCategories = task?.categories && task?.categories.length > 0;
  const hasSkills = task?.skills && task?.skills.length > 0;

  return (
    <div className={styles.overviewWrapper}>
      {hasCategories && (
        <ShowMoreItemsButton
          items={
            task?.categories?.map((category) => (
              <RelatedCategoryCard key={category.id} category={category}>
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
      )}
      <div className={styles.skillsBlock}>
        <div className={styles.headerSkills}>
          <h1>{t("task:labels.skills")}</h1>
        </div>
        {hasSkills && (
          <ShowMoreItemsButton
            items={
              task?.skills?.map((skill) => (
                <Tab
                  key={skill.name}
                  className={styles.skillWrapper}
                  name={skill.name}
                />
              )) ?? []
            }
            classNameItems={styles.skillsTaskList}
            classNameButton={styles.buttonShowMoreSkills}
            buttonContent={<ActionsIcon className={styles.actions} />}
            initialVisibleCount={7}
          />
        )}
      </div>
      {hasLocation && (
        <div className={styles.mapLocationBlock}>
          <div className={styles.projectPageMainInfo}>
            <div className={styles.headerTextInfo}>
              <div className={styles.activitiesLocations}>
                <h2>{t("task:labels.activities")}</h2>
                <span>{t("task:labels.locations")}</span>
              </div>
              <p>{t("task:labels.subtitle")}</p>
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
                        <div className={styles.popupLabel}>
                          {t("task:labels.relatedEvent")}
                        </div>
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
                        <div className={styles.popupLabel}>
                          {t("task:labels.relatedProject")}
                        </div>
                        <ProjectPopupContent
                          project={task.project}
                          organizationTitle={task.organization.name}
                        />
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
