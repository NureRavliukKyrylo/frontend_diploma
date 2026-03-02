import {
  ProjectDeadlineFilter,
  ProjectDistanceFilter,
  ProjectOrganizationFilter,
  ProjectRatingFilter,
} from "@features/projects";
import styles from "./CategoryProjectFiltersWidget.module.scss";

export const CategoryProjectFiltersWidget = () => {
  return (
    <>
      <ProjectDeadlineFilter />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectRatingFilter />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectOrganizationFilter />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectDistanceFilter />
      <div className={styles.dividerFilterBlock}></div>
    </>
  );
};
