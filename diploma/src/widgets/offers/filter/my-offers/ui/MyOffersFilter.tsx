import { motion } from "framer-motion";
import {
  DateRangeFilter,
  SelectFilter,
  SwitchFilter,
} from "@shared/ui/filters";
import { BaseWrapperFilter } from "../../base-wrapper/BaseWrapperFilter";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { onlineOptions, type OfferMySearchParams } from "@entities/offer";
import { useMyOffersFilter } from "../model/useMyOffersFilter";
import styles from "./MyOffersFilter.module.scss";
import { CategoriesListFilter } from "@features/project";
import { SkillsListFilter } from "@features/skills";
import { useOffersFiltersInfiniteQuery } from "@shared/api/filters";

interface MyOffersFilterProps {
  search: OfferMySearchParams;
}

export const MyOffersFilter = ({ search }: MyOffersFilterProps) => {
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
          <h1 className={styles.subHeaderFilter}>Offer deadline due</h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.myOfferCategories}>
          <h1 className={styles.subHeaderFilter}>Categories</h1>
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
          <h1 className={styles.subHeaderFilter}>Skills</h1>
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
          <h1 className={styles.subHeaderFilter}>More options</h1>
          <div className={styles.moreOptionsBlock}>
            <SwitchFilter
              label="Show completed offers"
              value={search.IncludeArchived ?? false}
              onChange={onIncludeArchivedChange}
            />
          </div>
          <SelectFilter
            label="Offer format"
            options={onlineOptions}
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
              Clear Filters
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseWrapperFilter>
  );
};
