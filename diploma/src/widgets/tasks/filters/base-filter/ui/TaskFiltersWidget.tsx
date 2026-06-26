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
import type { TaskSearchParams, TasksRequestParams } from "@entities/task";
import { SkillsListFilter } from "@features/skills";
import { useSkillsInfiniteQuery } from "@entities/skill";
import { Link } from "@tanstack/react-router";
import { useCategoriesInfiniteQuery } from "@entities/category";
import type { BaseFiltersRoute } from "@shared/config/types";
import { useTranslation } from "react-i18next";
import { toggleArrayParam } from "@shared/libs/search-params";

interface TaskFiltersWidgetProps {
  search: TasksRequestParams;
  includeCategories?: boolean;
  hideOrganizationFilter?: boolean;
  from?: BaseFiltersRoute;
  onChange?: (patch: Partial<TaskSearchParams>) => void;
  onClearFilters?: () => void;
}

export const TaskFiltersWidget = ({
  search,
  includeCategories = true,
  hideOrganizationFilter = false,
  from = "/activities/",
  onChange,
  onClearFilters: onClearFiltersProp,
}: TaskFiltersWidgetProps) => {
  const { t } = useTranslation("common");
  const routeFilters = useTaskFilters(from);

  const onStartDateChange = onChange
    ? (date: string | undefined) => onChange({ From: date, Page: 1 })
    : routeFilters.onStartDateChange;
  const onEndBeforeChange = onChange
    ? (date: string | undefined) => onChange({ To: date, Page: 1 })
    : routeFilters.onEndBeforeChange;
  const onRatingChange = onChange
    ? (rating: number | undefined) => onChange({ RatingFrom: rating, Page: 1 })
    : routeFilters.onRatingChange;
  const onProjectToggle = onChange
    ? (id: string) =>
        onChange({
          ProjectIds: toggleArrayParam(search.ProjectIds, id),
          Page: 1,
        })
    : routeFilters.onProjectToggle;
  const onOrganizationToggle = onChange
    ? (id: string) =>
        onChange({
          OrganizationIds: toggleArrayParam(search.OrganizationIds, id),
          Page: 1,
        })
    : routeFilters.onOrganizationToggle;
  const onClearFilters = onClearFiltersProp ?? routeFilters.onClearFilters;
  const onEventToggle = onChange
    ? (id: string) =>
        onChange({
          EventIds: toggleArrayParam(search.EventIds, id),
          Page: 1,
        })
    : routeFilters.onEventToggle;
  const onSkillToggle = onChange
    ? (id: string) =>
        onChange({
          SkillIds: toggleArrayParam(search.SkillIds, id),
          Page: 1,
        })
    : routeFilters.onSkillToggle;
  const onCategoryToggle = onChange
    ? (id: string) =>
        onChange({
          CategoryIds: toggleArrayParam(search.CategoryIds, id),
          Page: 1,
        })
    : routeFilters.onCategoryToggle;

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
                {t("actions.showAll", {
                  subject: t("filters.subjects.tasks").toUpperCase(),
                })}
              </Link>
            </motion.div>
          </div>
        )}
        <div className={styles.taskDeadLine}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.deadlineDue", { subject: t("filters.subjects.task") })}
          </h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskRating}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.rating", { subject: t("filters.subjects.task") })}
          </h1>
          <RatingFilter
            rating={search.RatingFrom}
            onRatingChange={onRatingChange}
          />
        </div>
        {includeCategories && (
          <>
            <div className={styles.dividerFilterBlock} />
            <div className={styles.taskCategories}>
              <h1 className={styles.subHeaderFilter}>
                {t("filters.categories")}
              </h1>
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
          <h1 className={styles.subHeaderFilter}>
            {t("filters.requiredSkills")}
          </h1>
          <SkillsListFilter
            useSkillsQuery={useSkillsInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.SkillIds}
            onToggle={onSkillToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskProjects}>
          <h1 className={styles.subHeaderFilter}>{t("filters.projects")}</h1>
          <ProjectsListFilter
            useProjectsQuery={useProjectsInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.ProjectIds}
            onToggle={onProjectToggle}
          />
        </div>
        {!hideOrganizationFilter && (
          <>
            <div className={styles.dividerFilterBlock} />
            <div className={styles.taskOrganizations}>
              <h1 className={styles.subHeaderFilter}>
                {t("filters.organizations")}
              </h1>
              <OrganizationsListFilter
                useOrganizationsQuery={useOrganizationsInfiniteQuery({
                  PageSize: 7,
                })}
                selectedIds={search.OrganizationIds}
                onToggle={onOrganizationToggle}
              />
            </div>
          </>
        )}
        <div className={styles.dividerFilterBlock} />
        <div className={styles.taskEvents}>
          <h1 className={styles.subHeaderFilter}>{t("filters.events")}</h1>
          <EventsListFilter
            useEventsQuery={useEventsInfiniteQuery({ PageSize: 7 })}
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
            {t("actions.clearFilters")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
