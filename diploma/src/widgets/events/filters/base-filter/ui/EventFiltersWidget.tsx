import styles from "./EventFiltersWidget.module.scss";
import { useProjectsInfiniteQuery } from "@entities/project";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import { useEventFilters } from "../model/useEventFilters";
import {
  DateRangeFilter,
  DistanceFilter,
  RatingFilter,
  SwitchFilter,
} from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";
import { CategoriesListFilter, ProjectsListFilter } from "@features/project";
import { SkillsListFilter } from "@features/skills";
import { useSkillsInfiniteQuery } from "@entities/skill";
import type { EventRequestParams } from "@entities/event/libs";
import { Link } from "@tanstack/react-router";
import { useCategoriesInfiniteQuery } from "@entities/category";
import type { BaseFiltersRoute } from "@shared/config/types";

interface EventFiltersWidgetProps {
  search: EventRequestParams;
  includeCategories?: boolean;
  from?: BaseFiltersRoute;
}

export const EventFiltersWidget = ({
  search,
  includeCategories = true,
  from = "/activities/",
}: EventFiltersWidgetProps) => {
  const {
    onStartDateChange,
    onEndBeforeChange,
    onRatingChange,
    onProjectToggle,
    onOrganizationToggle,
    onLocationSelect,
    onLocationClear,
    onRadiusChange,
    onOnlyActiveChange,
    onShowJoinedChange,
    onClearFilters,
    onIncludeSeries,
    onSkillToggle,
    onCategoryToggle,
  } = useEventFilters(from);

  return (
    <>
      <div className={styles.scrollableEventsFilters}>
        {!includeCategories && (
          <div className={styles.buttonShowAllEvents}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={styles.animationButtonBlock}
            >
              <Link
                to="/activities"
                search={{ tab: "events", ...search }}
                className={styles.showAllEventsButton}
              >
                SHOW ALL EVENTS
              </Link>
            </motion.div>
          </div>
        )}
        <div className={styles.eventDeadLine}>
          <h1 className={styles.subHeaderFilter}>Event deadline due</h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.eventRating}>
          <h1 className={styles.subHeaderFilter}>Event rating</h1>
          <RatingFilter
            rating={search.Rating}
            onRatingChange={onRatingChange}
          />
        </div>
        {includeCategories && (
          <>
            <div className={styles.dividerFilterBlock} />
            <div className={styles.eventCategories}>
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
        <div className={styles.eventSkills}>
          <h1 className={styles.subHeaderFilter}>Required skills</h1>
          <SkillsListFilter
            useSkillsQuery={useSkillsInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.SkillIds}
            onToggle={onSkillToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.eventProjects}>
          <h1 className={styles.subHeaderFilter}>Projects</h1>
          <ProjectsListFilter
            useProjectsQuery={useProjectsInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.ProjectIds}
            onToggle={onProjectToggle}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.eventOrganizations}>
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
        <div className={styles.eventDistance}>
          <h1 className={styles.subHeaderFilter}>Distance</h1>
          <DistanceFilter
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
            <SwitchFilter
              label="Show completed projects"
              value={search.IncludeArchived ?? false}
              onChange={onOnlyActiveChange}
            />
            <SwitchFilter
              label="Display joined projects"
              value={search.ShowJoined ?? false}
              onChange={onShowJoinedChange}
            />
            <SwitchFilter
              label="Display series events"
              value={search.IncludeSeriesMasters ?? false}
              onChange={onIncludeSeries}
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
