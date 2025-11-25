import { ProjectCard } from "@entities/project";
import styles from "./ProjectsListWidget.module.scss";

interface Project {
  id: string;
  imageOrganization: string;
  nameOrganization: string;
  titleProject: string;
  descriptionProject: string;
}

interface ProjectsListWidgetProps {
  projects: Project[];
  className?: string;
}

export const ProjectsListWidget = ({ projects }: ProjectsListWidgetProps) => {
  return (
    <div className={styles.projectsListWrapper}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          imageOrganization={project.imageOrganization}
          nameOrganization={project.nameOrganization}
          titleProject={project.titleProject}
          descriptionProject={project.descriptionProject}
        />
      ))}
    </div>
  );
};
