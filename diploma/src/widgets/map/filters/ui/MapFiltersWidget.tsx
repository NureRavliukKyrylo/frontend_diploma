import { CategoriesListFilter } from "@features/project";
import type { ProjectSearchParams } from "@entities/project";
import styles from "./MapFiltersWidget.module.scss";
import { Accordion, AccordionItem } from "@heroui/react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useCategoriesInfiniteQuery } from "@entities/category";
import { useOrganizationsInfiniteQuery } from "@entities/organization";
import { useMapFilters } from "../model/useMapFilters";
import {
  DateRangeFilter,
  DistanceFilter,
  RatingFilter,
  SwitchFilter,
} from "@shared/ui/filters";
import { OrganizationsListFilter } from "@features/organization";

interface MapFiltersWidgetProps {
  search: ProjectSearchParams;
}

export const MapFiltersWidget = ({ search }: MapFiltersWidgetProps) => {
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
          <AccordionItem key="deadline" title="Project deadline due">
            <DateRangeFilter
              startDate={search.StartDate}
              endBefore={search.EndBefore}
              onStartDateChange={onStartDateChange}
              onEndBeforeChange={onEndBeforeChange}
            />
          </AccordionItem>
          <AccordionItem key="rating" title="Project rating">
            <RatingFilter
              rating={search.Rating}
              onRatingChange={onRatingChange}
            />
          </AccordionItem>
          <AccordionItem key="categories" title="Categories">
            <CategoriesListFilter
              useCategoriesQuery={useCategoriesInfiniteQuery({ PageSize: 7 })}
              selectedIds={search.CategoryIds}
              onToggle={onCategoryToggle}
            />
          </AccordionItem>
          <AccordionItem key="organization" title="Organizations">
            <OrganizationsListFilter
              useOrganizationsQuery={useOrganizationsInfiniteQuery({
                PageSize: 7,
              })}
              selectedIds={search.OrganizationIds}
              onToggle={onOrganizationToggle}
            />
          </AccordionItem>
          <AccordionItem key="distance" title="Distance">
            <DistanceFilter
              defaultLocation={search.Location}
              defaultRadiusKm={search.RadiusKm}
              onLocationSelect={onLocationSelect}
              onLocationClear={onLocationClear}
              onRadiusChange={onRadiusChange}
            />
          </AccordionItem>
          <AccordionItem key="moreOptions" title="More options">
            <div className={styles.moreOptionsBlock}>
              <SwitchFilter
                label="Show completed projects"
                value={search.ShowJoined ?? false}
                onChange={onShowJoinedChange}
              />
              <SwitchFilter
                label="Display joined projects"
                value={search.OnlyActive ?? false}
                onChange={onOnlyActiveChange}
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
            Clear Filters
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
