import { motion } from "framer-motion";
import styles from "./MyProjectsFilterWidget.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { CategoriesListFilter } from "@features/project";
import type { MyProjectsSearchParams } from "@entities/project";
import { useMyProjectFilters } from "./model/useMyProjectsFilter";
import { useFiltersInfiniteQuery } from "@shared/api/filters";
import { DateRangeFilter, SwitchFilter } from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";
import { mapQueryData } from "@shared/libs/query";

interface MyProjectsFilterWidgetProps {
  search: MyProjectsSearchParams;
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
  return (
    <>
      <div className={styles.scrollableProjectsFilters}>
        <div className={styles.projectDeadLine}>
          <h1 className={styles.subHeaderFilter}>Project deadline due</h1>
          <DateRangeFilter
            startDate={search.StartDate}
            endBefore={search.EndBefore}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.projectCategories}>
          <h1 className={styles.subHeaderFilter}>Categories</h1>
          <CategoriesListFilter
            useCategoriesQuery={mapQueryData(
              useFiltersInfiniteQuery({
                pageSize: 7,
                entityType: "project",
                facetType: "category",
              }),
              ({ id, title }) => ({ id, name: title }),
            )}
            selectedIds={search.CategoryIds}
            onToggle={onCategoryToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.projectOrganizations}>
          <h1 className={styles.subHeaderFilter}>Organizations</h1>
          <OrganizationsListFilter
            useOrganizationsQuery={mapQueryData(
              useFiltersInfiniteQuery({
                pageSize: 7,
                entityType: "event",
                facetType: "organization",
              }),
              ({ id, title }) => ({ id, name: title }),
            )}
            selectedIds={search.OrganizationIds}
            onToggle={onOrganizationToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.moreOptions}>
          <h1 className={styles.subHeaderFilter}>More options</h1>
          <div className={styles.moreOptionsBlock}>
            <SwitchFilter
              label="Display completed projects"
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
