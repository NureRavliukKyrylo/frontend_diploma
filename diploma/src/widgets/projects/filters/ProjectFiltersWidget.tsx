import {
  ProjectCategoriesFilter,
  ProjectDeadlineFilter,
  ProjectDistanceFilter,
  ProjectOrganizationFilter,
  ProjectRatingFilter,
} from "@features/projects";
import styles from "./ProjectFiltersWidget.module.scss";

export const ProjectFiltersWidget = () => {
  return (
    <>
      <ProjectDeadlineFilter />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectRatingFilter />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectCategoriesFilter />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectOrganizationFilter />
      <div className={styles.dividerFilterBlock}></div>
      <ProjectDistanceFilter />
      <div className={styles.dividerFilterBlock}></div>
    </>
  );
};
