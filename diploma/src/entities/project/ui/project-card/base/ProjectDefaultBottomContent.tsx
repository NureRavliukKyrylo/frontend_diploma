import { Calendar } from "@shared/assets/icons/info";
import styles from "./ProjectCardBase.module.scss";
import { ProgressBar } from "@shared/ui";
import type { Project } from "../../../model";
import { formatDateToText } from "@shared/libs/date";

interface ProjectDefaultBottomContentProps {
  project: Project;
}

export const ProjectDefaultBottomContent = ({
  project,
}: ProjectDefaultBottomContentProps) => (
  <>
    <div className={styles.deadlineBlock}>
      <Calendar className={styles.calendarProject} />
      <span>{formatDateToText(project.endAt)}</span>
    </div>
    <div className={styles.progressBlock}>
      <div className={styles.progressInfo}>
        <h1>Progress</h1>
        <h2>{project.progressPercent} %</h2>
      </div>
      <ProgressBar current={project.progressPercent} />
    </div>
  </>
);
