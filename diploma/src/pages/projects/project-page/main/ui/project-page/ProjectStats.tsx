import { useTranslation } from "react-i18next";
import type { Project } from "@entities/project";
import { ProgressBar } from "@shared/ui";
import styles from "../ProjectPage.module.scss";

interface ProjectStatsProps {
  project: Project;
}

export const ProjectStats = ({ project }: ProjectStatsProps) => {
  const { t } = useTranslation(["project", "common"]);

  return (
    <div className={styles.statsProjectInfo}>
      <div className={styles.levelProjectInfo}>
        <div className={styles.headerLevelBar}>
          <span className={styles.current}>
            {t("common:level.current", {
              level: project.progress.level ?? 0,
            })}
          </span>
          <span className={styles.xp}>
            {project.progress.currentProgress}/{project.progress.maxProgress}
          </span>
        </div>
        <ProgressBar
          current={project.progress.currentProgress ?? 0}
          max={project.progress.maxProgress}
        />
        <div className={styles.footerLevelBar}>
          <span className={styles.label}>{t("common:level.next")}</span>
          <span className={styles.next}>
            {t("common:level.current", {
              level:
                project.progress?.level == null
                  ? 1
                  : project.progress.level + 1,
            })}
          </span>
        </div>
      </div>
      <div className={styles.ratingProjectInfo}>
        <h1>{project.rating.value}</h1>
        <p>
          ({t("project:rating.votes", { count: project.rating.totalVotes })})
        </p>
      </div>
    </div>
  );
};
