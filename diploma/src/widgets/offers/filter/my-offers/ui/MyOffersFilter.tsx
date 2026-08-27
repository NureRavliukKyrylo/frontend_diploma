import { motion } from "framer-motion";
import {
  DateRangeFilter,
  SelectFilter,
  SwitchFilter,
} from "@shared/ui/filters";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { getOnlineOptions, type OfferMySearchParams } from "@entities/offer";
import { useMyOffersFilter } from "../model/useMyOffersFilter";
import styles from "./MyOffersFilter.module.scss";
import { CategoriesListFilter } from "@features/project";
import { SkillsListFilter } from "@features/skills";
import { useOffersFiltersInfiniteQuery } from "@shared/api/filters";
import { BaseWrapperFilter } from "@shared/ui/wrappers";
import { useTranslation } from "react-i18next";

interface MyOffersFilterProps {
  search: OfferMySearchParams;
}

export const MyOffersFilter = ({ search }: MyOffersFilterProps) => {
  const { t } = useTranslation("common");
  const {
    onClearFilters,
    onEndBeforeChange,
    onStartDateChange,
    onIncludeArchivedChange,
    onShowOnlineChange,
    onCategoryToggle,
    onSkillToggle,
  } = useMyOffersFilter();

  return (
    <BaseWrapperFilter>
      <div className={styles.wrapper}>
        <div className={styles.myOfferDeadLine}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.deadlineDue", { subject: t("filters.subjects.offer") })}
          </h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.myOfferCategories}>
          <h1 className={styles.subHeaderFilter}>{t("filters.categories")}</h1>
          <CategoriesListFilter
            useCategoriesQuery={useOffersFiltersInfiniteQuery({
              pageSize: 7,
              facetType: "category",
              scope: "owner",
            })}
            selectedIds={search.CategoryIds}
            onToggle={onCategoryToggle}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.myOfferSkills}>
          <h1 className={styles.subHeaderFilter}>{t("filters.skills")}</h1>
          <SkillsListFilter
            useSkillsQuery={useOffersFiltersInfiniteQuery({
              pageSize: 7,
              facetType: "skill",
              scope: "owner",
            })}
            selectedIds={search.SkillIds}
            onToggle={onSkillToggle}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.moreOptions}>
          <h1 className={styles.subHeaderFilter}>{t("filters.moreOptions")}</h1>
          <div className={styles.moreOptionsBlock}>
            <SwitchFilter
              label={t("filters.displayCompleted", {
                subject: t("filters.subjects.offers"),
              })}
              value={search.IncludeArchived ?? false}
              onChange={onIncludeArchivedChange}
            />
          </div>
          <SelectFilter
            label={t("filters.offerFormat")}
            options={getOnlineOptions(t)}
            value={
              search.IsOnline === undefined
                ? "all"
                : search.IsOnline
                  ? "online"
                  : "offline"
            }
            onChange={(val) =>
              onShowOnlineChange(val === "all" ? undefined : val === "online")
            }
          />
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
      </div>
    </BaseWrapperFilter>
  );
};
