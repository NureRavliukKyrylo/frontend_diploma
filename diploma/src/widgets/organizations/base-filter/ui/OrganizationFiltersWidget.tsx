import styles from "./OrganizationFiltersWidget.module.scss";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { type OrganizationSearchParams } from "@entities/organization";
import { useOrganizationFilters } from "../model/useOrganizationFilters";
import { DistanceFilter, RatingFilter, SwitchFilter } from "@shared/ui/filters";
import { useTranslation } from "react-i18next";

interface OrganizationFiltersWidgetProps {
  search: OrganizationSearchParams;
}

export const OrganizationFiltersWidget = ({
  search,
}: OrganizationFiltersWidgetProps) => {
  const { t } = useTranslation("common");
  const {
    onRatingChange,
    onLocationSelect,
    onLocationClear,
    onRadiusChange,
    onShowJoinedChange,
    onClearFilters,
    onIncludeArchived,
  } = useOrganizationFilters();

  return (
    <>
      <div className={styles.scrollableOrganizationsFilters}>
        <div className={styles.organizationRating}>
          <h1 className={styles.subHeaderFilter}>
            {t("filters.rating", {
              subject: t("filters.subjects.organization"),
            })}
          </h1>
          <RatingFilter
            rating={search.RatingFrom}
            onRatingChange={onRatingChange}
          />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.organizationDistance}>
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
              label={t("filters.includeArchived", {
                subject: t("filters.subjects.organizations"),
              })}
              value={search.IncludeArchived ?? false}
              onChange={onIncludeArchived}
            />
            <SwitchFilter
              label={t("filters.displayJoined", {
                subject: t("filters.subjects.organizations"),
              })}
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
            {t("actions.clearFilters")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
