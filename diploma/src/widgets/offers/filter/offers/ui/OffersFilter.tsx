import { motion } from "framer-motion";
import { DateRangeFilter } from "@shared/ui/filters";
import { BaseWrapperFilter } from "../../base-wrapper/BaseWrapperFilter";
import styles from "./OffersFilter.module.scss";
import { onlineOptions, type OfferSearchParams } from "@entities/offer";
import { useOffersFilter } from "../model/useOffersFilter";
import { DistanceFilter, SwitchFilter } from "@shared/ui/filters";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useSkillsInfiniteQuery } from "@entities/skill";
import { CategoriesListFilter } from "@features/project";
import { SelectFilter } from "@shared/ui/filters/select-filter/SelectFilter";

interface OffersFilterProps {
  search: OfferSearchParams;
}

export const OffersFilter = ({ search }: OffersFilterProps) => {
  const {
    onCategoryToggle,
    onClearFilters,
    onEndBeforeChange,
    onLocationClear,
    onLocationSelect,
    onRadiusChange,
    onShowJoinedChange,
    onStartDateChange,
    onSkillToggle,
    onIncludeArchivedChange,
    onShowOnlineChange,
  } = useOffersFilter();

  return (
    <BaseWrapperFilter>
      <div className={styles.wrapper}>
        <div className={styles.offerDeadLine}>
          <h1 className={styles.subHeaderFilter}>Offer deadline due</h1>
          <DateRangeFilter
            startDate={search.From}
            endBefore={search.To}
            onStartDateChange={onStartDateChange}
            onEndBeforeChange={onEndBeforeChange}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.offerCategories}>
          <h1 className={styles.subHeaderFilter}>Categories</h1>
          <CategoriesListFilter
            useCategoriesQuery={useCategoriesInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.CategoryIds}
            onToggle={onCategoryToggle}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.offerSkills}>
          <h1 className={styles.subHeaderFilter}>Skills</h1>
          <CategoriesListFilter
            useCategoriesQuery={useSkillsInfiniteQuery({ PageSize: 7 })}
            selectedIds={search.SkillIds}
            onToggle={onSkillToggle}
          />
        </div>

        <div className={styles.dividerFilterBlock} />

        <div className={styles.offerDistance}>
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
              label="Show completed offers"
              value={search.IncludeArchived ?? false}
              onChange={onIncludeArchivedChange}
            />

            <SwitchFilter
              label="Display joined offers"
              value={search.ShowJoined ?? false}
              onChange={onShowJoinedChange}
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
