import { CategoryDetailWidget } from "@widgets/categories";
import { Suspense } from "react";
import styles from "./CategoriesDetailPage.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectsListWidget } from "@widgets/projects";
import { CategoryProjectFiltersWidget } from "@widgets/categories";
import {
  ProjectCard,
  ProjectCardSkeleton,
  projectQuery,
  sortingProjectItems,
  useProjectsListQuery,
} from "@entities/project";
import { Pagination } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { useCategoryDetailPage } from "./model/useCategoryDetailPage";
import { useRouter } from "@tanstack/react-router";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import {
  layoutTransition,
  fadeVariants,
  fadeDuration,
  staggeredCardVariants,
  headerVariants,
} from "@shared/assets/animations";

export function CategoryDetailPage() {
  const {
    search,
    searchWithCategory,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useCategoryDetailPage();
  const router = useRouter();
  const { data: projects } = useQuery(projectQuery.list(searchWithCategory));

  return (
    <div className={styles.projectsCategoryWrapper}>
      <motion.div
        {...headerVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <CategoryDetailWidget />
      </motion.div>

      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <CategoryProjectFiltersWidget search={searchWithCategory} />
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

      <div className={styles.paginationWrapper}>
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
