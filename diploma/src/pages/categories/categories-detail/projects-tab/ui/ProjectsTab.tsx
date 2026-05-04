import { ToggleDropdownButton } from "@shared/ui/buttons";
import styles from "./ProjectsTab.module.scss";
import { ProjectFiltersWidget, ProjectsListWidget } from "@widgets/projects";
import {
  ProjectCard,
  ProjectCardSkeleton,
  sortingProjectItems,
  useProjectsListQuery,
  type ProjectSearchParamsNoCategories,
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

interface ProjectsTabProps {
  search: ProjectSearchParamsNoCategories;
  categoryId: string;
}

export const ProjectsTab = ({ search, categoryId }: ProjectsTabProps) => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    projects,
    router,
  } = useProjectsTab(search, categoryId);

  return (
    <div className={styles.categoryProjectsSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
              <p className="errorHint">
                Try reloading the page or come back later.
              </p>
            </div>
          );
        }}
      >
        <div className={styles.filterProjectsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <ProjectFiltersWidget
                search={search}
                includeCategories={false}
                from="/categories/$id/"
              />
            </ToggleDropdownButton>
            <SearchBar
              value={search.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={sortingProjectItems}
              onSelect={handleSort}
              value={search.OrderBy ?? "Default"}
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
                <h2>No projects found</h2>
                <p>Try adjusting your filters or search query</p>
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
                    key={JSON.stringify(search)}
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
                      useProjectsQuery={useProjectsListQuery({
                        CategoryIds: [categoryId],
                        ...search,
                      })}
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
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};
