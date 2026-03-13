import type { Project, ProjectsQueryResult } from "@entities/project";
import { ProjectsListWidgetSkeleton } from "./ProjectListWidgetSkeleton";
import styles from "./ProjectsListWidget.module.scss";

interface ProjectsListWidgetProps {
  useProjectsQuery: () => ProjectsQueryResult;
  renderCard: (project: Project) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const ProjectsListWidget = ({
  useProjectsQuery,
  renderCard,
  renderSkeleton,
  skeletonItems = 9,
  className,
}: ProjectsListWidgetProps) => {
  const { data: projects, isLoading } = useProjectsQuery();

  const wrapperClass =
    `${styles.projectsListWrapper} ${className ?? ""}`.trim();

  if (isLoading && renderSkeleton) {
    return (
      <ProjectsListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }

  return (
    <div className={wrapperClass}>
      {projects?.data.map((project) => renderCard(project))}
    </div>
  );
};
