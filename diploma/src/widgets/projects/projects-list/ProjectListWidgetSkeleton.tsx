import styles from "./ProjectsListWidget.module.scss";

interface ProjectsListWidgetSkeletonProps {
  renderSkeleton: () => React.ReactNode;
  items?: number;
  className?: string;
}

export const ProjectsListWidgetSkeleton = ({
  renderSkeleton,
  items = 9,
  className,
}: ProjectsListWidgetSkeletonProps) => {
  const wrapperClass =
    `${styles.projectsListWrapper} ${className ?? ""}`.trim();

  return (
    <div className={wrapperClass}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};
