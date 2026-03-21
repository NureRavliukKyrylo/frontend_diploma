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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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
          transition={{
            layout: {
              ease: "backOut",
              duration: 0.4,
            },
          }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectsListWidget
                    renderCard={(project, index) => (
                      <motion.div
                        key={project.id}
                        custom={index + 1}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: (i) => ({
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.4,
                              ease: "easeOut",
                              delay: i * 0.06,
                            },
                          }),
                          hover: {
                            scale: 1.03,
                            transition: { ease: "easeInOut", duration: 0.2 },
                          },
                        }}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        transition={{
                          scale: { ease: "easeInOut", duration: 0.2 },
                        }}
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
