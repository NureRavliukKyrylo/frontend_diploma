import { CategoriesListFilter } from "@features/project";
import styles from "./ProjectFiltersWidget.module.scss";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import { useProjectFilters } from "../model/useProjectFilters";
import {
  DateRangeFilter,
  DistanceFilter,
  RatingFilter,
  SwitchFilter,
} from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";
import { Link } from "@tanstack/react-router";
import type { ProjectRequestParams } from "@entities/project/libs";
import type { BaseFiltersRoute } from "@shared/config/types";
import { useTranslation } from "react-i18next";

interface ProjectFiltersWidgetProps {
  search: ProjectRequestParams;
  includeCategories?: boolean;
  hideOrganizationFilter?: boolean;
  from?: BaseFiltersRoute;
}

export const ProjectFiltersWidget = ({
  search,
  includeCategories = true,
  hideOrganizationFilter = false,
  from = "/activities/",
}: ProjectFiltersWidgetProps) => {
  const { t } = useTranslation("common");
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
  } = useProjectFilters(from);

  return (
    <>
      <div className={styles.scrollableProjectsFilters}>
        {!includeCategories && (
          <div className={styles.buttonShowAllProjects}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={styles.animationButtonBlock}
            >
              <Link
                to="/activities"
                search={{ tab: "projects", ...search }}
                className={styles.showAllProjectsButton}
              >
                {t("actions.showAll", {
                  subject: t("filters.subjects.projects").toUpperCase(),
                })}
              </Link>
            </motion.div>
          </div>
        )}
        <div className={styles.projectDeadLine}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.deadlineDue", {
              subject: t("filters.subjects.project"),
            })}
          </h1>
          <DateRangeFilter
            startDate={search.StartDate}
            endBefore={search.EndBefore}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.projectRating}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.rating", { subject: t("filters.subjects.project") })}
          </h1>
          <RatingFilter
            rating={search.Rating}
            onRatingChange={onRatingChange}
          />
        </div>
        {includeCategories && (
          <>
            <div className={styles.dividerFilterBlock} />
            <div className={styles.projectCategories}>
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
        {!hideOrganizationFilter && (
          <>
            <div className={styles.dividerFilterBlock} />
            <div className={styles.projectOrganizations}>
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
        <div className={styles.projectDistance}>
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
              value={search.ShowJoined ?? false}
              onChange={onShowJoinedChange}
            />
            <SwitchFilter
              label={t("filters.displayJoined", {
                subject: t("filters.subjects.projects"),
              })}
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
            {t("actions.clearFilters")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
