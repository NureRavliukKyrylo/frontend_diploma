import { ProjectCard, projectQuery } from "@entities/project";
import styles from "./ProjectsListWidget.module.scss";
import { useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

export const ProjectsListWidget = () => {
  const search = useSearch({ from: "/_masterLayout/projects/" });
  const { data: projects } = useSuspenseQuery(projectQuery.list(search));

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
          deadline="Feb 4, 2025"
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
