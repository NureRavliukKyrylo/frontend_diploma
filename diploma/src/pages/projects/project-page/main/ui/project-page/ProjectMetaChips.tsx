import { useTranslation } from "react-i18next";
import type { Project } from "@entities/project";
import { Calendar } from "@shared/assets/icons/info";
import { formatDateRange } from "@shared/libs/date";
import type { useProjectPage } from "../../model/useProjectPage";
import styles from "../ProjectPage.module.scss";

interface ProjectMetaChipsProps {
  project: Project;
  policyConfig: ReturnType<typeof useProjectPage>["policyConfig"];
}

export const ProjectMetaChips = ({
  project,
  policyConfig,
}: ProjectMetaChipsProps) => {
  const { t, i18n } = useTranslation(["project"]);
  const dateLocale = i18n.language === "uk" ? "uk" : "en";

  return (
    <div className={styles.projectMetaInfo}>
      <span className={styles.metaChipProject}>{t("project:meta.chip")}</span>
      {project.endAt ? (
        <span className={`${styles.metaChip} ${styles.calendar}`}>
          <Calendar className={styles.calendarImg} />
          <span>
            {formatDateRange(project.startAt, project.endAt, dateLocale)}
          </span>
        </span>
      ) : null}
      {policyConfig ? (
        <span
          className={`${styles.metaChip} ${styles.policy}`}
          style={{ boxShadow: policyConfig.boxShadow }}
        >
          <span
            style={{
              background: policyConfig.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {policyConfig.label}
          </span>
        </span>
      ) : null}
    </div>
  );
};
