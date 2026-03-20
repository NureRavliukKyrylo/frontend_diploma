import type { Project } from "@entities/project";
import styles from "./ProjectsListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { QueryResult } from "@shared/config/types";

interface ProjectsListWidgetProps {
  useProjectsQuery: () => QueryResult<Project>;
  renderCard: (project: Project, index: number) => React.ReactNode;
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
      <ListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }
  return (
    <div className={wrapperClass}>
      {projects?.map((project, index) => renderCard(project, index))}
    </div>
  );
};
