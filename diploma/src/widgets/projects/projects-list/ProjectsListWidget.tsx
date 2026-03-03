import { ProjectCard, projectQuery } from "@entities/project";
import styles from "./ProjectsListWidget.module.scss";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ProjectSearchParams } from "@entities/project";
import { formatDateToInput } from "@shared/libs";

interface ProjectsListWidgetProps {
  search: ProjectSearchParams;
  pageSize?: number;
}

export const ProjectsListWidget = ({
  search,
  pageSize = 9,
}: ProjectsListWidgetProps) => {
  const { data: projects } = useSuspenseQuery(
    projectQuery.list(search, pageSize),
  );

  return (
    <div className={styles.projectsListWrapper}>
      {projects.data.map((project) => (
        <ProjectCard
          key={project.id}
          image={
            "https://impactflowavatar.blob.core.windows.net/avatar/avatars/8f62543b-1f21-4927-93cd-d873d3ed3e51.jpg"
          }
          name={"kiberkit"}
          title={project.title}
          description={project.description}
          deadline={formatDateToInput(project.endAt)}
          progress={59}
          avatars={[
            "https://impactflowavatar.blob.core.windows.net/avatar/avatars/8f62543b-1f21-4927-93cd-d873d3ed3e51.jpg",
            "https://impactflowavatar.blob.core.windows.net/avatar/avatars/8f62543b-1f21-4927-93cd-d873d3ed3e51.jpg",
            "https://impactflowavatar.blob.core.windows.net/avatar/avatars/8f62543b-1f21-4927-93cd-d873d3ed3e51.jpg",
          ]}
          tasks={11}
        />
      ))}
    </div>
  );
};
