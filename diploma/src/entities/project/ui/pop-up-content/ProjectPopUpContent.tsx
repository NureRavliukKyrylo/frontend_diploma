import { Link } from "@tanstack/react-router";
import { DefaultAvatar } from "@shared/assets/images/user";
import type { Project } from "../../model";
import styles from "./ProjectPopupContent.module.scss";

interface ProjectPopupContentProps {
  project: Project;
}

export const ProjectPopupContent = ({ project }: ProjectPopupContentProps) => {
  return (
    <div className={styles.popupProjectContent}>
      <div className={styles.projectInfo}>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <Link
          to="/projects/$id"
          params={{ id: project.id }}
          className={styles.seeMoreButtonProject}
        >
          see more
        </Link>
      </div>
      <div className={styles.organizationProjectInfo}>
        <div className={styles.organizationImage}>
          <img
            src={project.organization?.logoUrl ?? DefaultAvatar}
            alt="organization"
          />
          <h1>{project.organization?.name}</h1>
        </div>
      </div>
    </div>
  );
};
