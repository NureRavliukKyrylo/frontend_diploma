import {
  ProjectDeadlineFilter,
  ProjectDistanceFilter,
  ProjectOrganizationFilter,
  ProjectRatingFilter,
  type NavigateParams,
} from "@features/projects";
import styles from "./CategoryProjectFiltersWidget.module.scss";
import type { ProjectSearchParams } from "@entities/project";

interface CategoryProjectFiltersWidgetProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}

export const CategoryProjectFiltersWidget = ({
  search,
  from,
}: CategoryProjectFiltersWidgetProps) => {
  return (
    <>
      <ProjectDeadlineFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectRatingFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectOrganizationFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectDistanceFilter search={search} from={from} />
      <div className={styles.dividerFilterBlock}></div>
    </>
  );
};
