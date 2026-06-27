import { CategoriesListFilter } from "@features/project";
import type { MapProjectRequestParams } from "@entities/project";
import styles from "./MapFiltersWidget.module.scss";
import { Accordion, AccordionItem } from "@heroui/react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import { useMapFilters } from "../model/useMapFilters";
import { useTranslation } from "react-i18next";
import {
  DateRangeFilter,
  DistanceFilter,
  RatingFilter,
  SwitchFilter,
} from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";

interface MapFiltersWidgetProps {
  search: MapProjectRequestParams;
}

export const MapFiltersWidget = ({ search }: MapFiltersWidgetProps) => {
  const { t } = useTranslation(["common"]);
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
  } = useMapFilters();

  const projectSubject = t("common:filters.subjects.project");

  return (
    <>
      <div className={styles.scrollableFilters}>
        <Accordion
          selectionMode="multiple"
          motionProps={{
            initial: { opacity: 0, y: -4 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -4 },
            transition: { duration: 0.18, ease: "easeInOut" },
          }}
          itemClasses={{
            title: styles.title,
            base: styles.base,
            indicator: styles.indicator,
            trigger: styles.trigger,
            content: styles.content,
          }}
        >
          <AccordionItem
            key="deadline"
            title={t("common:filters.deadlineDue", { subject: projectSubject })}
          >
            <DateRangeFilter
              startDate={search.StartDate}
              endBefore={search.EndBefore}
              onStartDateChange={onStartDateChange}
              onEndBeforeChange={onEndBeforeChange}
            />
          </AccordionItem>

          <AccordionItem
            key="rating"
            title={t("common:filters.rating", { subject: projectSubject })}
          >
            <RatingFilter
              rating={search.RatingFrom}
              onRatingChange={onRatingChange}
            />
          </AccordionItem>

          <AccordionItem
            key="categories"
            title={t("common:filters.categories")}
          >
            <CategoriesListFilter
              useCategoriesQuery={useCategoriesInfiniteQuery({ PageSize: 7 })}
              selectedIds={search.CategoryIds}
              onToggle={onCategoryToggle}
            />
          </AccordionItem>

          <AccordionItem
            key="organization"
            title={t("common:filters.organizations")}
          >
            <OrganizationsListFilter
              useOrganizationsQuery={useOrganizationsInfiniteQuery({
                PageSize: 7,
              })}
              selectedIds={search.OrganizationIds}
              onToggle={onOrganizationToggle}
            />
          </AccordionItem>

          <AccordionItem key="distance" title={t("common:filters.distance")}>
            <DistanceFilter
              defaultLocation={search.Location}
              defaultRadiusKm={search.RadiusKm}
              onLocationSelect={onLocationSelect}
              onLocationClear={onLocationClear}
              onRadiusChange={onRadiusChange}
            />
          </AccordionItem>

          <AccordionItem
            key="moreOptions"
            title={t("common:filters.moreOptions")}
          >
            <div className={styles.moreOptionsBlock}>
              <SwitchFilter
                label={t("common:filters.displayCompleted", {
                  subject: t("common:filters.subjects.projects"),
                })}
                value={search.IncludeArchived ?? false}
                onChange={onOnlyActiveChange}
              />
              <SwitchFilter
                label={t("common:filters.displayJoined", {
                  subject: t("common:filters.subjects.projects"),
                })}
                value={search.ShowJoined ?? false}
                onChange={onShowJoinedChange}
              />
            </div>
          </AccordionItem>
        </Accordion>
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
            {t("common:actions.clearFilters")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
