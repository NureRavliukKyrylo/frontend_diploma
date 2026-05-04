import styles from "./TaskFiltersWidget.module.scss";
import { useProjectsInfiniteQuery } from "@entities/project";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import { useTaskFilters } from "../model/useTaskFilters";
import { DateRangeFilter, RatingFilter } from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";
import { useEventsInfiniteQuery } from "@entities/event";
import { CategoriesListFilter, ProjectsListFilter } from "@features/project";
import { EventsListFilter } from "@features/event";
import type { TasksRequestParams } from "@entities/task";
import { SkillsListFilter } from "@features/skills";
import { useSkillsInfiniteQuery } from "@entities/skill";
import { Link } from "@tanstack/react-router";
import { useCategoriesInfiniteQuery } from "@entities/category";
import type { BaseFiltersRoute } from "@shared/config/types";

interface TaskFiltersWidgetProps {
  search: TasksRequestParams;
  includeCategories?: boolean;
  from?: BaseFiltersRoute;
}

export const TaskFiltersWidget = ({
  search,
  includeCategories = true,
  from = "/activities/",
}: TaskFiltersWidgetProps) => {
  const {
    onStartDateChange,
    onEndBeforeChange,
    onRatingChange,
    onProjectToggle,
    onOrganizationToggle,
    onClearFilters,
    onEventToggle,
    onSkillToggle,
    onCategoryToggle,
  } = useTaskFilters(from);

  return (
    <>
      <div className={styles.scrollableTaskFilters}>
        {!includeCategories && (
          <div className={styles.buttonShowAllTasks}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={styles.animationButtonBlock}
            >
              <Link
                to="/activities"
                search={{ tab: "tasks", ...search }}
                className={styles.showAllTasksButton}
              >
                SHOW ALL TASKS
              </Link>
            </motion.div>
          </div>
        )}
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
        <div className={styles.taskRating}>
          <h1 className={styles.subHeaderFilter}>Task rating</h1>
          <RatingFilter
            rating={search.Rating}
            onRatingChange={onRatingChange}
          />
        </div>
        {includeCategories && (
          <>
            <div className={styles.dividerFilterBlock} />
            <div className={styles.taskCategories}>
              <h1 className={styles.subHeaderFilter}>Categories</h1>
              <CategoriesListFilter
                useCategoriesQuery={useCategoriesInfiniteQuery({ PageSize: 7 })}
                selectedIds={search.CategoryIds}
                onToggle={onCategoryToggle}
              />
            </div>
          </>
        )}

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
