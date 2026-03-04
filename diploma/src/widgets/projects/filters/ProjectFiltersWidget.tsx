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
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface ProjectFiltersWidgetProps {
  search: ProjectSearchParams;
  from: Exclude<NavigateParams, "/categories/$id/">;
}

export const ProjectFiltersWidget = ({
  search,
  from,
}: ProjectFiltersWidgetProps) => {
  const navigate = useNavigate({ from });
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
      <div className={styles.projectCategories}>
        <h1 className={styles.subHeaderFilter}>Categories</h1>
        <ProjectCategoriesFilter search={search} from={from} />
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
      <div className={styles.buttonClear}>
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={styles.animationButtonBlock}
        >
          <BaseButtonWrapper
            onClick={() => {
              navigate({ search: {} });
            }}
            className={styles.clearFiltersButton}
          >
            Clear Filters
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
