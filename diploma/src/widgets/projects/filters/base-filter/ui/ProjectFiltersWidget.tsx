import {
  OnlyActiveFilter,
  ProjectCategoriesFilter,
  ProjectDeadlineFilter,
  ProjectDistanceFilter,
  ProjectOrganizationFilter,
  ProjectRatingFilter,
  ShowJoinedFilter,
} from "@features/projects";
import styles from "./ProjectFiltersWidget.module.scss";
import type { ProjectSearchParams } from "@entities/project";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import { useProjectFilters } from "../model/useProjectFilters";

interface ProjectFiltersWidgetProps {
  search: ProjectSearchParams;
}

export const ProjectFiltersWidget = ({ search }: ProjectFiltersWidgetProps) => {
  const {
    onStartDateChange,
    onEndBeforeChange,
    onRatingChange,
    onCategoryToggle,
    onOrganizationToggle,
    onLocationSelect,
    onLocationClear,
    onRadiusChange,
    onOnlyActiveChange,
    onShowJoinedChange,
    onClearFilters,
  } = useProjectFilters();

  return (
    <>
      <div className={styles.scrollableProjectsFilters}>
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
        <div className={styles.projectCategories}>
          <h1 className={styles.subHeaderFilter}>Categories</h1>
          <ProjectCategoriesFilter
            useCategoriesQuery={useCategoriesInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.CategoryIds}
            onToggle={onCategoryToggle}
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
