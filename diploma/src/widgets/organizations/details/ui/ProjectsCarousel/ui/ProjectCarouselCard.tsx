import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "@entities/project";
import styles from "../ProjectsCarousel.module.scss";

interface ProjectCarouselCardProps {
  project: Project;
  onOpen: (projectId: string) => void;
}

const getProjectProgress = (project: Project) => {
  const total = Math.max(project.tasksTotal ?? 0, 0);
  const completed = Math.max(project.tasksCompleted ?? 0, 0);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    completed,
    total,
    percent: Math.min(percent, 100),
  };
};

export const ProjectCarouselCard = ({
  project,
  onOpen,
}: ProjectCarouselCardProps) => {
  const { t } = useTranslation("organizations");
  const progress = getProjectProgress(project);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(project.id);
    }
  };

  return (
    <article
      className={styles.projectCard}
      onClick={() => onOpen(project.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>
          {project.description || t("carousel.noDescription")}
        </p>
      </div>

      <div className={styles.progressBlock}>
        <div className={styles.progressRow}>
          <span>{t("carousel.progress")}</span>
          <span>
            {progress.completed}/{progress.total}
          </span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>
    </article>
  );
};
