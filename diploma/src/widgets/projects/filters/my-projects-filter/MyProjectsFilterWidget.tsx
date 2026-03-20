import { motion } from "framer-motion";
import styles from "./MyProjectsFilterWidget.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import {
  OnlyActiveFilter,
  ProjectCategoriesFilter,
  ProjectDeadlineFilter,
  ProjectOrganizationFilter,
} from "@features/projects";
import type { MyProjectSearchParams } from "@entities/project";
import { useMyProjectFilters } from "./model/useMyProjectsFilter";

interface MyProjectsFilterWidgetProps {
  search: MyProjectSearchParams;
}
export const MyProjectsFilterWidget = ({
  search,
}: MyProjectsFilterWidgetProps) => {
  const {
    onStartDateChange,
    onEndBeforeChange,
    onCategoryToggle,
    onOrganizationToggle,
    onClearFilters,
    onOnlyActiveChange,
  } = useMyProjectFilters();
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
      <div className={styles.moreOptions}>
        <h1 className={styles.subHeaderFilter}>More options</h1>
        <div className={styles.moreOptionsBlock}>
          <OnlyActiveFilter
            value={search.OnlyActive}
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
  </>;
};
