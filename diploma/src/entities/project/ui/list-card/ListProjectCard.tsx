import styles from "./ListProjectCard.module.scss";
import type { Project } from "../../model";
import { Stars } from "@shared/ui/stars";

export interface ListProjectCardProps {
  project: Project;
}

export const ListProjectCard = ({ project }: ListProjectCardProps) => {
  return (
    <div className={styles.listCardProjectWrapper}>
      <div className={styles.headerInfo}>
        <h1>{project.title}</h1>
        <h2>project</h2>
      </div>
      <div className={styles.bottomContent}>
        <Stars
          value={project.rating.value}
          gradient="rgba(140, 0, 0, 0.66)"
          classNameStar={styles.projectRating}
        />
        <h1>{project.rating.value}</h1>
      </div>
    </div>
  );
};
