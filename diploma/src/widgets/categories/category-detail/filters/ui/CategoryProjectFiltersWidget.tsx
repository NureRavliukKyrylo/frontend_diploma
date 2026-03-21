import {
  OnlyActiveFilter,
  ProjectDeadlineFilter,
  ProjectDistanceFilter,
  ProjectOrganizationFilter,
  ProjectRatingFilter,
  ShowJoinedFilter,
} from "@features/projects";
import styles from "./CategoryProjectFiltersWidget.module.scss";
import type { ProjectSearchParams } from "@entities/project";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Link } from "@tanstack/react-router";
import { useCategoryProjectFilters } from "../model/useCategoryProjectsFilter";
import { useOrganizationsInfiniteQuery } from "@entities/organization";

interface CategoryProjectFiltersWidgetProps {
  search: ProjectSearchParams;
}

export const CategoryProjectFiltersWidget = ({
  search,
}: CategoryProjectFiltersWidgetProps) => {
  const {
    onStartDateChange,
    onEndBeforeChange,
    onRatingChange,
    onOrganizationToggle,
    onLocationSelect,
    onLocationClear,
    onRadiusChange,
    onOnlyActiveChange,
    onShowJoinedChange,
    onClearFilters,
  } = useCategoryProjectFilters();

  return (
    <>
      <div className={styles.scrollableProjectsFilters}>
        <div className={styles.buttonShowAllProjects}>
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={styles.animationButtonBlock}
          >
            <Link
              to="/projects"
              search={search}
              className={styles.showAllProjectsButton}
            >
              SHOW ALL PROJECTS
            </Link>
          </motion.div>
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.projectDeadLine}>
          <h1 className={styles.subHeaderFilter}>Project deadline due</h1>
          <ProjectDeadlineFilter
            startDate={search.StartDate}
            endBefore={search.EndBefore}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.projectRating}>
          <h1 className={styles.subHeaderFilter}>Project rating</h1>
          <ProjectRatingFilter
            rating={search.Rating}
            onRatingChange={onRatingChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.projectOrganizations}>
          <h1 className={styles.subHeaderFilter}>Organizations</h1>
          <ProjectOrganizationFilter
            useOrganizationsQuery={useOrganizationsInfiniteQuery({
              PageSize: 7,
            })}
            selectedIds={search.OrganizationIds}
            onToggle={onOrganizationToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.projectDistance}>
          <h1 className={styles.subHeaderFilter}>Distance</h1>
          <ProjectDistanceFilter
            defaultLocation={search.Location}
            defaultRadiusKm={search.RadiusKm}
            onLocationSelect={onLocationSelect}
            onLocationClear={onLocationClear}
            onRadiusChange={onRadiusChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.moreOptions}>
          <h1 className={styles.subHeaderFilter}>More options</h1>
          <div className={styles.moreOptionsBlock}>
            <ShowJoinedFilter
              value={search.ShowJoined ?? false}
              onChange={onShowJoinedChange}
            />
            <OnlyActiveFilter
              value={search.OnlyActive ?? false}
              onChange={onOnlyActiveChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.dividerFilterBlock} />
      <div className={styles.buttonClear}>
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={styles.animationButtonBlock}
        >
          <BaseButtonWrapper
            onClick={onClearFilters}
            className={styles.clearFiltersButton}
          >
            Clear Filters
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
