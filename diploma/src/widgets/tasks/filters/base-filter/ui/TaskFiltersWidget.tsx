import styles from "./TaskFiltersWidget.module.scss";
import { useProjectsInfiniteQuery } from "@entities/project";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import { useTaskFilters } from "../model/useTaskFilters";
import { DateRangeFilter } from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";
import { useEventsInfiniteQuery } from "@entities/event";
import { ProjectsListFilter } from "@features/project";
import { EventsListFilter } from "@features/event";
import type { TasksRequestParams } from "@entities/task";
import { SkillsListFilter } from "@features/skills";
import { useSkillsInfiniteQuery } from "@entities/skill";

interface TaskFiltersWidgetProps {
  search: TasksRequestParams;
}

export const TaskFiltersWidget = ({ search }: TaskFiltersWidgetProps) => {
  const {
    onStartDateChange,
    onEndBeforeChange,
    onRatingChange,
    onProjectToggle,
    onOrganizationToggle,
    onClearFilters,
    onEventToggle,
    onSkillToggle,
  } = useTaskFilters();

  return (
    <>
      <div className={styles.scrollableTaskFilters}>
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
        <div className={styles.taskSkills}>
          <h1 className={styles.subHeaderFilter}>Required skills</h1>
          <SkillsListFilter
            useSkillsQuery={useSkillsInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.SkillIds}
            onToggle={onSkillToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskProjects}>
          <h1 className={styles.subHeaderFilter}>Projects</h1>
          <ProjectsListFilter
            useProjectsQuery={useProjectsInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.ProjectIds}
            onToggle={onProjectToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskOrganizations}>
          <h1 className={styles.subHeaderFilter}>Organizations</h1>
          <OrganizationsListFilter
            useOrganizationsQuery={useOrganizationsInfiniteQuery({
              PageSize: 7,
            })}
            selectedIds={search.OrganizationIds}
            onToggle={onOrganizationToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskEvents}>
          <h1 className={styles.subHeaderFilter}>Events</h1>
          <EventsListFilter
            useEventsQuery={useEventsInfiniteQuery({
              PageSize: 7,
            })}
            selectedIds={search.EventIds}
            onToggle={onEventToggle}
          />
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
