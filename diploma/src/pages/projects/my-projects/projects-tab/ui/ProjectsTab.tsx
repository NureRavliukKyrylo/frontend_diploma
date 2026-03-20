import { useSearch } from "@tanstack/react-router";
import styles from "./ProjectsTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { MyProjectsFilterWidget, ProjectsListWidget } from "@widgets/projects/";
import { useProjectsTab } from "../model/useProjectsTab";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import {
  ProjectCardBase,
  ProjectCardSkeleton,
  projectQuery,
  sortingProjectItems,
} from "@entities/project";
import { Pagination } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { useMyProjectsListQuery } from "@entities/project/model/hooks/useMyProjectsListQuery";

export const ProjectsTab = () => {
  const search = useSearch({ from: "/_masterLayout/projects/my/" });
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useProjectsTab();

  const { data: projects } = useQuery(projectQuery.my(search));

  return (
    <>
      <div className={styles.mainMyProjectsSection}>
        <div className={styles.filtersBlock}>
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <MyProjectsFilterWidget search={search} />
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
          transition={{ layout: { ease: "backOut", duration: 0.4 } }}
          className={`${styles.myProjectsList} ${isFilterOpen ? styles.filterOpen : ""}`}
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
                        className={styles.projectCardMotion}
                      >
                        <ProjectCardBase project={project} avatars={[]} />
                      </motion.div>
                    )}
                    useProjectsQuery={useMyProjectsListQuery(search)}
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
    </>
  );
};
