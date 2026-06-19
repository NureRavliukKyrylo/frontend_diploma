import { Calendar } from "@shared/assets/icons/info";
import styles from "./ProjectCardBase.module.scss";
import { ProgressBar } from "@shared/ui";
import type { Project } from "../../../model";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";

interface ProjectDefaultBottomContentProps {
  project: Project;
}

export const ProjectDefaultBottomContent = ({
  project,
}: ProjectDefaultBottomContentProps) => {
  const { t, i18n } = useTranslation(["project"]);

  return (
    <>
      <div className={styles.deadlineBlock}>
        <Calendar className={styles.calendarProject} />
        <span>
          {formatDateToText(project.endAt, i18n.language as "en" | "uk")}
        </span>
      </div>
      <div className={styles.progressBlock}>
        <div className={styles.progressInfo}>
          <h1>{t("project:cards.progress")}</h1>
          <h2>{project.progress.percent} %</h2>
        </div>
        <ProgressBar current={project.progress.percent} />
      </div>
    </>
  );
};
