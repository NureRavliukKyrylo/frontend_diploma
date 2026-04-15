import styles from "./OrganizationFiltersWidget.module.scss";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { type OrganizationSearchParams } from "@entities/organization";
import { useOrganizationFilters } from "../model/useOrganizationFilters";
import { DistanceFilter, RatingFilter, SwitchFilter } from "@shared/ui/filters";

interface OrganizationFiltersWidgetProps {
  search: OrganizationSearchParams;
}

export const OrganizationFiltersWidget = ({
  search,
}: OrganizationFiltersWidgetProps) => {
  const {
    onRatingChange,
    onLocationSelect,
    onLocationClear,
    onRadiusChange,
    onShowJoinedChange,
    onClearFilters,
  } = useOrganizationFilters();

  return (
    <>
      <div className={styles.scrollableOrganizationsFilters}>
        <div className={styles.organizationRating}>
          <h1 className={styles.subHeaderFilter}>Organization rating</h1>
          <RatingFilter
            rating={search.Rating}
            onRatingChange={onRatingChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.organizationDistance}>
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
              onChange={onShowJoinedChange}
            />
            <SwitchFilter
              label="Display joined projects"
              value={search.ShowJoined ?? false}
              onChange={onShowJoinedChange}
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
