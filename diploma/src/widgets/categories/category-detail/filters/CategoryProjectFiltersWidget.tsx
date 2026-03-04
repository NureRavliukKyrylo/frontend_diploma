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
      <div className={styles.projectDeadLine}>
        <h1 className={styles.subHeaderFilter}>Project deadline due</h1>
        <ProjectDeadlineFilter search={search} from={from} />
      </div>
      <div className={styles.dividerFilterBlock}></div>
      <div className={styles.projectRating}>
        <h1 className={styles.subHeaderFilter}>Project rating</h1>
        <ProjectRatingFilter search={search} from={from} />
      </div>
      <div className={styles.dividerFilterBlock}></div>
      <div className={styles.projectOrganizations}>
        <h1 className={styles.subHeaderFilter}>Organizations</h1>
        <ProjectOrganizationFilter search={search} from={from} />
      </div>
      <div className={styles.dividerFilterBlock}></div>
      <div className={styles.projectDistance}>
        <h1 className={styles.subHeaderFilter}>Distance</h1>
        <ProjectDistanceFilter search={search} from={from} />
      </div>
      <div className={styles.dividerFilterBlock}></div>
    </>
  );
};
