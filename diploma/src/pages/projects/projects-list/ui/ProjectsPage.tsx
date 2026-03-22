import {
  ProjectFiltersWidget,
  ProjectsHeader,
  ProjectsListWidget,
} from "@widgets/projects";
import { Pagination } from "@shared/ui";
import { Suspense } from "react";
import { useRouter } from "@tanstack/react-router";
import styles from "./ProjectsPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import {
  ProjectCard,
  ProjectCardSkeleton,
  projectQuery,
  sortingProjectItems,
  useProjectsListQuery,
} from "@entities/project";
import { AnimatePresence, motion } from "framer-motion";
import { useProjectsPage } from "../model/useProjectsPage";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import {
  layoutTransition,
  fadeVariants,
  fadeDuration,
  staggeredCardVariants,
  createFadeVariants,
} from "@shared/assets/animations";

const headerVariants = createFadeVariants({
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
});

export function ProjectsPage() {
  const {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useProjectsPage();
  const { data: projects } = useQuery(projectQuery.list(search));
  const router = useRouter();

  return (
    <div className={styles.projectsWrapper}>
      <motion.div
        {...headerVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ProjectsHeader search={search} />
      </motion.div>

      <div className={styles.mainProjectsSection}>
        <div className={styles.filterProjectsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <ProjectFiltersWidget search={search} />
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
                      useProjectsQuery={useProjectsListQuery(search)}
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
      </div>
    </div>
  );
}
