import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import type { OrganizationMember } from "@entities/organization";
import { projectQuery } from "@entities/project";
import { OrganizationDetailsEmptyState } from "../shared/empty-state/ui/EmptyState";
import {
  buildProjectPreviewCards,
  buildProjectTaskRows,
  getVisibleProjects,
  hasProjectCarouselControls,
} from "./lib/helpers";
import { sectionVariants, surfaceVariants } from "./lib/animation";
import { useOrganizationTasksData } from "../shared/task-data/model/useOrganizationTasksData";
import { OrganizationProjectsShowcase } from "./ui/ProjectsShowcase";
import { OrganizationTasksTable } from "./ui/TasksTable";
import styles from "./Widget.module.scss";

interface OrganizationDetailsProjectsWidgetProps {
  organizationId: string;
  members: OrganizationMember[];
}

export const OrganizationDetailsProjectsWidget = ({
  organizationId,
  members,
}: OrganizationDetailsProjectsWidgetProps) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<1 | -1>(1);
  const { data: projectsResponse, isLoading: isProjectsLoading } = useQuery(
    projectQuery.list({
      OrganizationIds: [organizationId],
      Page: 1,
      PageSize: 100,
      OnlyActive: false,
      ShowJoined: false,
      OrderBy: "Default",
    }),
  );
  const { tasks, isLoading: isTasksLoading } = useOrganizationTasksData({
    organizationId,
  });

  const previewProjects = useMemo(
    () => buildProjectPreviewCards(projectsResponse?.data ?? []),
    [projectsResponse?.data],
  );
  const showCarouselControls = hasProjectCarouselControls(previewProjects.length);

  const shiftCarousel = (direction: 1 | -1) => {
    setCarouselDirection(direction);
    setCarouselOffset((prev) => {
      if (!showCarouselControls) return 0;

      const nextIndex = prev + direction;
      return (nextIndex + previewProjects.length) % previewProjects.length;
    });
  };

  const visibleProjects = useMemo(
    () => getVisibleProjects(previewProjects, carouselOffset),
    [carouselOffset, previewProjects],
  );

  const taskRows = useMemo(
    () => buildProjectTaskRows(tasks, members),
    [members, tasks],
  );
  const showUnifiedEmptyState =
    !isProjectsLoading &&
    !isTasksLoading &&
    previewProjects.length === 0 &&
    taskRows.length === 0;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.18 },
      };

  if (showUnifiedEmptyState) {
    return (
      <motion.section
        id="organization-projects-section"
        className={styles.emptySection}
        variants={sectionVariants}
        {...motionProps}
      >
        <OrganizationDetailsEmptyState className={styles.emptyContent} />
      </motion.section>
    );
  }

  return (
    <motion.section
      id="organization-projects-section"
      className={styles.section}
      variants={sectionVariants}
      {...motionProps}
    >
      <motion.div className={styles.sectionTitle} variants={surfaceVariants}>
        <span className={styles.line} />
        <h2>Projects</h2>
        <span className={styles.line} />
      </motion.div>

      <OrganizationProjectsShowcase
        visibleProjects={visibleProjects}
        isLoading={isProjectsLoading}
        showCarouselControls={showCarouselControls}
        carouselOffset={carouselOffset}
        carouselDirection={carouselDirection}
        prefersReducedMotion={prefersReducedMotion}
        onShiftCarousel={shiftCarousel}
      />

      <OrganizationTasksTable
        taskRows={taskRows}
        isLoading={isTasksLoading}
      />
    </motion.section>
  );
};
