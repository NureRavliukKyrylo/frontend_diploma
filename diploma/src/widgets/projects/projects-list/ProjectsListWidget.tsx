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
          imageOrganization={""}
          nameOrganization={""}
          titleProject={project.title}
          descriptionProject={project.descriprion}
        />
      ))}
    </div>
  );
};
