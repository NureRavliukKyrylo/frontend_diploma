import styles from "./ProjectsListFilter.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import type { QueryResult } from "@shared/config/types";
import type { Project } from "@entities/project";
import { Tab } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface ProjectsListFilterProps {
  useProjectsQuery: () => QueryResult<Pick<Project, "id" | "title">>;
  selectedIds?: string[];
  onToggle: (id: string) => void;
}

export const ProjectsListFilter = ({
  useProjectsQuery,
  selectedIds,
  onToggle,
}: ProjectsListFilterProps) => {
  const { t } = useTranslation("common");
  const {
    data: projects = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useProjectsQuery();

  if (isError) {
    return (
      <div className={styles.stateMessage}>
        <p className={styles.errorMessage}>Failed to load projects</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return <p className={styles.emptyText}>No projects found</p>;
  }

  return (
    <div className={styles.projectsInfinite}>
      <div className={styles.projectsListFilter}>
        <AnimatePresence mode="wait">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={styles.projectTabWrapper}
            >
              <Tab
                name={project.title}
                isSelected={selectedIds?.includes(project.id) ?? false}
                onClick={() => onToggle(project.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasNextPage && (
        <BaseButtonWrapper
          onClick={() => fetchNextPage?.()}
          disabled={isFetchingNextPage}
          className={styles.showMoreProjectsButton}
        >
          {isFetchingNextPage
            ? t("loading.title")
            : t("actions.seeMore").toLowerCase()}
        </BaseButtonWrapper>
      )}
    </div>
  );
};
