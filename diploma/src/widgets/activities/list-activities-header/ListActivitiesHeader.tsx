import styles from "./ListActivitiesHeader.module.scss";
import { ActivitiesLogo } from "@shared/assets/images/information";
import { Link } from "@tanstack/react-router";
import { Toggle } from "@shared/ui";
import type { ListActivitiesMode } from "@shared/config/types";
import { listActivitiesTabs } from "@shared/config/constants";

interface ListActivitiesHeaderProps {
  activeTab: ListActivitiesMode;
  onTabChange: (tab: ListActivitiesMode) => void;
}

export const ListActivitiesHeader = ({
  activeTab,
  onTabChange,
}: ListActivitiesHeaderProps) => {
  return (
    <div className={styles.activitiesHeader}>
      <div className={styles.activitiesInformation}>
        <div className={styles.textActivitiesInfotamtion}>
          <div className={styles.textActivities}>
            <h1>Explore activities that make a difference</h1>
            <h2>432 activities</h2>
          </div>
          <div className={styles.activitiesDescription}>
            <p>
              Use our interactive world map to explore active and completed
              volunteer projects — from rebuilding schools and organizing
              community events to environmental clean-ups and humanitarian aid.
              Each pin on the map represents real people, real stories, and real
              change. Find out where help is needed most, learn more about each
              project, and get involved — locally or across the globe.
              <Link to="/map" className={styles.mapLink}>
                Map
              </Link>
            </p>
            <p>
              Want to see the active projects you’ve already joined?{" "}
              <Link to="/activities/my" className={styles.myActivitiesLink}>
                Click
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.listActivitiesToggle}>
          <Toggle
            tabs={listActivitiesTabs}
            activeValue={activeTab}
            onChange={onTabChange}
            buttonClassName={styles.toggleListActivitiesButton}
            activeButtonClassName={styles.toggleListActivitiesButtonActive}
            className={styles.toggleListActivities}
            pillClassName={styles.toggleListActivitiesPill}
          />
        </div>
      </div>
      <div className={styles.imageActivities}>
        <img src={ActivitiesLogo} alt="projects" />
      </div>
    </div>
  );
};
