import { projectQuery } from "@entities/project";
import styles from "./ProjectsListWidget.module.scss";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Project, ProjectSearchParams } from "@entities/project";

interface ProjectsListWidgetProps {
  search: ProjectSearchParams;
  pageSize?: number;
  renderCard: (project: Project) => React.ReactNode;
}

export const ProjectsListWidget = ({
  search,
  pageSize = 9,
  renderCard,
}: ProjectsListWidgetProps) => {
  const { data: projects } = useSuspenseQuery(
    projectQuery.list(search, pageSize),
  );

  return (
    <div className={styles.projectsListWrapper}>
      {projects.data.map((project) => renderCard(project))}
    </div>
  );
};
