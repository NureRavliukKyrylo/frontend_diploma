import {
  ProjectCategoriesFilter,
  ProjectDeadlineFilter,
  ProjectDistanceFilter,
  ProjectOrganizationFilter,
  ProjectRatingFilter,
  type NavigateParams,
} from "@features/projects";
import styles from "./ProjectFiltersWidget.module.scss";
import type { ProjectSearchParams } from "@entities/project";

interface ProjectFiltersWidgetProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}

export const ProjectFiltersWidget = ({
  search,
  from,
}: ProjectFiltersWidgetProps) => {
  return (
    <>
      <ProjectDeadlineFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectRatingFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectCategoriesFilter search={search} />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectOrganizationFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectDistanceFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
    </>
  );
};
