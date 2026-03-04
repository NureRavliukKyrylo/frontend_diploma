import {
  ProjectCategoriesFilter,
  ProjectDeadlineFilter,
  ProjectDistanceFilter,
  ProjectOrganizationFilter,
  ProjectRatingFilter,
  type NavigateParams,
} from "@features/projects";
import type { ProjectSearchParams } from "@entities/project";
import styles from "./MapFiltersWidget.module.scss";
import { Accordion, AccordionItem } from "@heroui/react";

interface MapFiltersWidgetProps {
  search: ProjectSearchParams;
  from: Exclude<NavigateParams, "/categories/$id/">;
}

export const MapFiltersWidget = ({ search, from }: MapFiltersWidgetProps) => {
  return (
    <div className={styles.scrollableFilters}>
      <Accordion
        selectionMode="multiple"
        itemClasses={{
          title: styles.title,
          base: styles.base,
          indicator: styles.indicator,
          trigger: styles.trigger,
        }}
      >
        <AccordionItem key="deadline" title="Project deadline due">
          <ProjectDeadlineFilter search={search} from={from} />
        </AccordionItem>
        <AccordionItem key="rating" title="Project rating">
          <ProjectRatingFilter search={search} from={from} />
        </AccordionItem>
        <AccordionItem key="categories" title="Categories">
          <ProjectCategoriesFilter search={search} from={from} />
        </AccordionItem>
        <AccordionItem key="organization" title="Organizations">
          <ProjectOrganizationFilter search={search} from={from} />
        </AccordionItem>
        <AccordionItem key="distance" title="Distance">
          <ProjectDistanceFilter search={search} from={from} />
        </AccordionItem>
      </Accordion>
    </div>
  );
};
