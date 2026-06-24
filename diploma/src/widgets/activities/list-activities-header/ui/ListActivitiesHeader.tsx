import styles from "./ListActivitiesHeader.module.scss";
import { ActivitiesLogo } from "@shared/assets/images/information";
import { Link } from "@tanstack/react-router";
import { Toggle } from "@shared/ui";
import type { ListActivitiesMode } from "@shared/config/types";
import { useTranslation } from "react-i18next";
import { getListActivitiesTabs } from "@shared/config/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { activityQuery } from "../model/activitiesQuery";

interface ListActivitiesHeaderProps {
  activeTab: ListActivitiesMode;
  onTabChange: (tab: ListActivitiesMode) => void;
}

export const ListActivitiesHeader = ({
  activeTab,
  onTabChange,
}: ListActivitiesHeaderProps) => {
  const { t } = useTranslation("activities");
  const { data: count } = useSuspenseQuery(activityQuery.count());
  const tabs = getListActivitiesTabs(t);

  return (
    <div className={styles.activitiesHeader}>
      <div className={styles.activitiesInformation}>
        <div className={styles.textActivitiesInfotamtion}>
          <div className={styles.textActivities}>
            <h1>{t("header.title")}</h1>
            <h2>{t("header.count", { count: count.total })}</h2>
          </div>
          <div className={styles.activitiesDescription}>
            <p>
              {t("header.descriptionMain")}{" "}
              <Link to="/map" className={styles.mapLink}>
                {t("header.mapLinkText")}
              </Link>
            </p>
            <p>
              {t("header.myActivitiesPrompt")}{" "}
              <Link to="/activities/my" className={styles.myActivitiesLink}>
                {t("header.myActivitiesLinkText")}
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.listActivitiesToggle}>
          <Toggle
            tabs={tabs}
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
