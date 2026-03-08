import { projectQuery } from "@entities/project";
import type { ProjectSearchParams, Project } from "@entities/project";
import styles from "./CombinedListWidget.module.scss";
import { useSuspenseQuery } from "@tanstack/react-query";

interface CombinedListWidgetProps {
  projectParams: ProjectSearchParams;
  renderProjectCard: (project: Project) => React.ReactNode;
}

export const CombinedListWidget = ({
  projectParams,
  renderProjectCard,
}: CombinedListWidgetProps) => {
  const { data: projects } = useSuspenseQuery(projectQuery.map(projectParams));
  return (
    <>
      <div className={styles.combinedListWidget}>
        {projects.data.map((project) => renderProjectCard(project))}
      </div>
    </>
  );
};
