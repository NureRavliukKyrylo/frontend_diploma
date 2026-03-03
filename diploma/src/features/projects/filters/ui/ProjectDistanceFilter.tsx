import type { ProjectSearchParams } from "@entities/project";
import styles from "./ProjectFilters.module.scss";
import type { NavigateParams } from "../model/NavigateParams";

interface ProjectDistanceFilterProps {
  search: ProjectSearchParams;
  from: NavigateParams;
}

export const ProjectDistanceFilter = ({
  search,
  from,
}: ProjectDistanceFilterProps) => {
  return (
    <div className={styles.projectDistance}>
      <h1 className={styles.subHeaderFilter}>Distance</h1>
    </div>
  );
};
