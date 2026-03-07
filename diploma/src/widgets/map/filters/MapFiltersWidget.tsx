import {
  MoreOptionsFilter,
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
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useNavigate } from "@tanstack/react-router";

interface MapFiltersWidgetProps {
  search: ProjectSearchParams;
  from: Exclude<NavigateParams, "/categories/$id/">;
}

export const MapFiltersWidget = ({ search, from }: MapFiltersWidgetProps) => {
  const navigate = useNavigate({ from });

  return (
    <>
      <div className={styles.scrollableFilters}>
        <Accordion
          selectionMode="multiple"
          motionProps={{
            initial: { opacity: 0, y: -4 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -4 },
            transition: {
              duration: 0.18,
              ease: "easeInOut",
            },
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
          <AccordionItem key="moreOptions" title="More options">
            <MoreOptionsFilter search={search} from={from} />
          </AccordionItem>
        </Accordion>
      </div>
      <div className={styles.dividerFilterBlock}></div>
      <div className={styles.buttonClear}>
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={styles.animationButtonBlock}
        >
          <BaseButtonWrapper
            onClick={() => {
              navigate({ search: {} });
            }}
            className={styles.clearFiltersButton}
          >
            Clear Filters
          </BaseButtonWrapper>
        </motion.div>
      </div>
    </>
  );
};
