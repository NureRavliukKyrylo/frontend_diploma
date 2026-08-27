import { motion } from "framer-motion";
import {
  DateRangeFilter,
  SelectFilter,
  SwitchFilter,
} from "@shared/ui/filters";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import {
  getOnlineOptions,
  type OfferJoinedSearchParams,
} from "@entities/offer";
import { useBookingsFilter } from "../model/useBookingsFilter";
import { CategoriesListFilter } from "@features/project";
import styles from "./BookingsFilter.module.scss";
import { useOffersFiltersInfiniteQuery } from "@shared/api/filters";
import { SkillsListFilter } from "@features/skills";
import { BaseWrapperFilter } from "@shared/ui/wrappers";
import { useTranslation } from "react-i18next";

interface BookingsFilterProps {
  search: OfferJoinedSearchParams;
}

export const BookingsFilter = ({ search }: BookingsFilterProps) => {
  const { t } = useTranslation("common");
  const {
    onCategoryToggle,
    onClearFilters,
    onEndBeforeChange,
    onStartDateChange,
    onSkillToggle,
    onIncludeArchivedChange,
    onShowOnlineChange,
  } = useBookingsFilter();

  return (
    <BaseWrapperFilter>
      <div className={styles.wrapper}>
        <div className={styles.bookingDeadLine}>
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

        <div className={styles.bookingCategories}>
          <h1 className={styles.subHeaderFilter}>{t("filters.categories")}</h1>
          <CategoriesListFilter
            useCategoriesQuery={useOffersFiltersInfiniteQuery({
              pageSize: 7,
              facetType: "category",
              scope: "user",
            })}
            selectedIds={search.CategoryIds}
            onToggle={onCategoryToggle}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.bookingSkills}>
          <h1 className={styles.subHeaderFilter}>{t("filters.skills")}</h1>
          <SkillsListFilter
            useSkillsQuery={useOffersFiltersInfiniteQuery({
              pageSize: 7,
              facetType: "skill",
              scope: "user",
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
