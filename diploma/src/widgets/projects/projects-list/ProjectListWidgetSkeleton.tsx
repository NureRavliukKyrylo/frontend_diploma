import styles from "./ProjectsListWidget.module.scss";
import { ProjectCardSkeleton } from "@entities/project";

interface ProjectsListWidgetSkeletonProps {
  items?: number;
}

export const ProjectsListWidgetSkeleton = ({
  items = 9,
}: ProjectsListWidgetSkeletonProps) => {
  return (
    <div className={styles.projectsListWrapper}>
      {Array.from({ length: items }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
};
