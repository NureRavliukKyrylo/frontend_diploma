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
import type {
  EventRequestParams,
  EventSearchParams,
} from "@entities/event/libs";
import { Link } from "@tanstack/react-router";
import { useCategoriesInfiniteQuery } from "@entities/category";
import type { BaseFiltersRoute } from "@shared/config/types";
import { useTranslation } from "react-i18next";
import { toggleArrayParam } from "@shared/libs/search-params";

interface EventFiltersWidgetProps {
  search: EventRequestParams;
  includeCategories?: boolean;
  hideOrganizationFilter?: boolean;
  from?: BaseFiltersRoute;
  onChange?: (patch: Partial<EventSearchParams>) => void;
  onClearFilters?: () => void;
}

export const EventFiltersWidget = ({
  search,
  includeCategories = true,
  hideOrganizationFilter = false,
  from = "/activities/",
  onChange,
  onClearFilters: onClearFiltersProp,
}: EventFiltersWidgetProps) => {
  const { t } = useTranslation("common");
  const routeFilters = useEventFilters(from);

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
  const onLocationSelect = onChange
    ? (
        location: { lat: number; lng: number; displayName: string },
        radiusKm: number,
      ) =>
        onChange({
          Lat: location.lat,
          Lng: location.lng,
          Location: location.displayName,
          RadiusKm: radiusKm,
          Page: 1,
        })
    : routeFilters.onLocationSelect;
  const onLocationClear = onChange
    ? () =>
        onChange({
          Lat: undefined,
          Lng: undefined,
          Location: undefined,
          RadiusKm: undefined,
        })
    : routeFilters.onLocationClear;
  const onRadiusChange = onChange
    ? (radiusKm: number) => onChange({ RadiusKm: radiusKm, Page: 1 })
    : routeFilters.onRadiusChange;
  const onOnlyActiveChange = onChange
    ? (value: boolean) => onChange({ IncludeArchived: value, Page: 1 })
    : routeFilters.onOnlyActiveChange;
  const onShowJoinedChange = onChange
    ? (value: boolean) => onChange({ ShowJoined: value, Page: 1 })
    : routeFilters.onShowJoinedChange;
  const onClearFilters = onClearFiltersProp ?? routeFilters.onClearFilters;
  const onIncludeSeries = onChange
    ? (value: boolean) => onChange({ IncludeSeriesMasters: value, Page: 1 })
    : routeFilters.onIncludeSeries;
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
                {t("actions.showAll", {
                  subject: t("filters.subjects.events").toUpperCase(),
                })}
              </Link>
            </motion.div>
          </div>
        )}
        <div className={styles.eventDeadLine}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.deadlineDue", { subject: t("filters.subjects.event") })}
          </h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.eventRating}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.rating", { subject: t("filters.subjects.event") })}
          </h1>
          <RatingFilter
            rating={search.RatingFrom}
            onRatingChange={onRatingChange}
          />
        </div>
        {includeCategories && (
          <>
            <div className={styles.dividerFilterBlock} />
            <div className={styles.eventCategories}>
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
        <div className={styles.eventSkills}>
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
        <div className={styles.eventProjects}>
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
            <div className={styles.eventOrganizations}>
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
        <div className={styles.eventDistance}>
          <h1 className={styles.subHeaderFilter}>{t("filters.distance")}</h1>
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
          <h1 className={styles.subHeaderFilter}>{t("filters.moreOptions")}</h1>
          <div className={styles.moreOptionsBlock}>
            <SwitchFilter
              label={t("filters.displayCompleted", {
                subject: t("filters.subjects.projects"),
              })}
              value={search.IncludeArchived ?? false}
              onChange={onOnlyActiveChange}
            />
            <SwitchFilter
              label={t("filters.displayJoined", {
                subject: t("filters.subjects.projects"),
              })}
              value={search.ShowJoined ?? false}
              onChange={onShowJoinedChange}
            />
            <SwitchFilter
              label={t("filters.displaySeries", "Display series events")}
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
            {t("actions.clearFilters")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
