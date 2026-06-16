import { motion } from "framer-motion";
import styles from "./MyProjectsFilterWidget.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { CategoriesListFilter } from "@features/project";
import { useMyProjectFilters } from "./model/useMyProjectsFilter";
import { useFiltersInfiniteQuery } from "@shared/api/filters";
import { DateRangeFilter, SwitchFilter } from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";
import { mapQueryData } from "@shared/libs/query";
import type { MyProjectsRequestParams } from "@entities/project";
import { useTranslation } from "react-i18next";

interface MyProjectsFilterWidgetProps {
  search: MyProjectsRequestParams;
}

export const MyProjectsFilterWidget = ({
  search,
}: MyProjectsFilterWidgetProps) => {
  const { t } = useTranslation("common");
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
        <div className={styles.projectCategories}>
          <h1 className={styles.subHeaderFilter}>{t("filters.categories")}</h1>
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
          <h1 className={styles.subHeaderFilter}>
            {t("filters.organizations")}
          </h1>
          <OrganizationsListFilter
            useOrganizationsQuery={mapQueryData(
              useFiltersInfiniteQuery({
                pageSize: 7,
                entityType: "project",
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
          <h1 className={styles.subHeaderFilter}>{t("filters.moreOptions")}</h1>
          <div className={styles.moreOptionsBlock}>
            <SwitchFilter
              label={t("filters.displayCompleted", {
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
