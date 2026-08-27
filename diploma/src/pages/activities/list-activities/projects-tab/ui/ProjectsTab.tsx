import { ToggleDropdownButton } from "@shared/ui/buttons";
import styles from "./ProjectsTab.module.scss";
import { ProjectFiltersWidget, ProjectsListWidget } from "@widgets/projects";
import {
  ProjectCard,
  ProjectCardSkeleton,
  getSortingProjectItems,
  useProjectsListQuery,
  type ProjectSearchParams,
} from "@entities/project";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { useProjectsTab } from "../model/useProjectsTab";
import { Pagination } from "@shared/ui";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { useTranslation } from "react-i18next";
import type { BaseFiltersRoute } from "@shared/config/types";

interface ProjectsTabProps {
  search: ProjectSearchParams;
  from?: BaseFiltersRoute;
  joinedOnly?: boolean;
  hideOrganizationFilter?: boolean;
}

export const ProjectsTab = ({
  search,
  from = "/activities/",
  joinedOnly = false,
  hideOrganizationFilter = false,
}: ProjectsTabProps) => {
  const { t } = useTranslation(["activities", "common"]);
  const effectiveSearch = joinedOnly
    ? { ...search, ShowJoined: true }
    : search;
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    projects,
    router,
  } = useProjectsTab(effectiveSearch, from, joinedOnly);

  return (
    <div className={styles.mainProjectsSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          );
        }}
      >
        <div className={styles.filterProjectsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <ProjectFiltersWidget
                search={effectiveSearch}
                from={from}
                hideOrganizationFilter={hideOrganizationFilter}
              />
            </ToggleDropdownButton>
            <SearchBar
              value={effectiveSearch.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={getSortingProjectItems(t)}
              onSelect={handleSort}
              value={effectiveSearch.OrderBy ?? "Default"}
            />
          </div>

          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={`${styles.projectsList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {projects?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>{t("activities:states.emptyProjects.title")}</h2>
                <p>{t("activities:states.emptyProjects.subtitle")}</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    renderSkeleton={ProjectCardSkeleton}
                    className={styles.projectsListSkeletonWrapper}
                  />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(effectiveSearch)}
                    {...fadeVariants}
                    transition={fadeDuration}
                  >
                    <ProjectsListWidget
                      renderCard={(project, index) => (
                        <motion.div
                          key={project.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className={styles.projectCardMotion}
                          onClick={() =>
                            router.navigate({
                              to: "/projects/$id",
                              params: { id: project.id },
                            })
                          }
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      )}
                      useProjectsQuery={useProjectsListQuery(effectiveSearch)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
        </div>

        {projects && projects.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={projects.pagination.totalPages}
              page={effectiveSearch.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
