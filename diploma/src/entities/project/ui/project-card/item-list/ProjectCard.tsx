import type { Project } from "@entities/project/model/types/Project";
import { ProjectCardBase } from "../base/ProjectCardBase";
import { ProjectDefaultBottomContent } from "../base/ProjectDefaultBottomContent";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <div className={styles.projectCardWrapper}>
    <ProjectCardBase
      project={project}
      bottomContent={<ProjectDefaultBottomContent project={project} />}
    />
  </div>
);
