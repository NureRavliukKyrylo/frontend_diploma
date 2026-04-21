import { motion } from "framer-motion";
import styles from "./MyTasksFilterWidget.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { ProjectsListFilter } from "@features/project";
import { useMyTasksFilters } from "./model/useMyTasksFilters";
import { useFiltersInfiniteQuery } from "@shared/api/filters";
import { DateRangeFilter, SwitchFilter } from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";
import { mapQueryData } from "@shared/libs/query";
import { EventsListFilter } from "@features/event";
import type { MyTasksRequestParams } from "@entities/task";

interface MyTasksFilterWidgetProps {
  search: MyTasksRequestParams;
}

export const MyTasksFilterWidget = ({ search }: MyTasksFilterWidgetProps) => {
  const {
    onStartDateChange,
    onEndBeforeChange,
    onOrganizationToggle,
    onClearFilters,
    onOnlyActiveChange,
    onProjectToggle,
  } = useMyTasksFilters();

  return (
    <>
      <div className={styles.scrollableTasksFilters}>
        <div className={styles.taskDeadLine}>
          <h1 className={styles.subHeaderFilter}>Task deadline due</h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskProjects}>
          <h1 className={styles.subHeaderFilter}>Projects</h1>
          <ProjectsListFilter
            useProjectsQuery={useFiltersInfiniteQuery({
              pageSize: 7,
              entityType: "task",
              facetType: "project",
            })}
            selectedIds={search.ProjectIds}
            onToggle={onProjectToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskOrganizations}>
          <h1 className={styles.subHeaderFilter}>Organizations</h1>
          <OrganizationsListFilter
            useOrganizationsQuery={mapQueryData(
              useFiltersInfiniteQuery({
                pageSize: 7,
                entityType: "task",
                facetType: "organization",
              }),
              ({ id, title }) => ({ id, name: title }),
            )}
            selectedIds={search.OrganizationIds}
            onToggle={onOrganizationToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskEvents}>
          <h1 className={styles.subHeaderFilter}>Events</h1>
          <EventsListFilter
            useEventsQuery={useFiltersInfiniteQuery({
              pageSize: 7,
              entityType: "task",
              facetType: "event",
            })}
            selectedIds={search.EventIds}
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
