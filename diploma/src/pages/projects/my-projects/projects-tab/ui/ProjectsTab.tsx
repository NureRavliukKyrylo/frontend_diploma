import { useSearch } from "@tanstack/react-router";
import styles from "./ProjectsTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { MyProjectsFilterWidget, ProjectsListWidget } from "@widgets/projects/";
import { useProjectsTab } from "../model/useProjectsTab";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import {
  ProjectControlCard,
  ProjectControlCardSkeleton,
  sortingProjectItems,
} from "@entities/project";
import { Pagination } from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { useMyProjectsListQuery } from "@entities/project/model/hooks/useMyProjectsListQuery";
import { LeaveProjectModal } from "@features/projects";
import {
  layoutTransition,
  fadeVariants,
  fadeDuration,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";

export const ProjectsTab = () => {
  const search = useSearch({ from: "/_masterLayout/projects/my/" });
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    hasActiveFilters,
    isEmpty,
    projects,
    handleCloseModal,
    handleLeaveProject,
    isModalOpen,
    selectedProject,
  } = useProjectsTab(search);

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
          transition={{ layout: layoutTransition }}
          className={`${styles.myProjectsList} ${isFilterOpen ? styles.filterOpen : ""}`}
        >
          {isEmpty ? (
            <div className={styles.emptyState}>
              {hasActiveFilters ? (
                <>
                  <h2>No projects found</h2>
                  <p>Try adjusting your filters or search query</p>
                </>
              ) : (
                <>
                  <h2>No projects yet</h2>
                  <p>Join your first project to get started</p>
                </>
              )}
            </div>
          ) : (
            <Suspense
              fallback={
                <ListWidgetSkeleton
                  renderSkeleton={ProjectControlCardSkeleton}
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
                        variants={staggeredCardVariantsNoHover}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={styles.motionCard}
                      >
                        <ProjectControlCard
                          project={project}
                          menuItems={[
                            {
                              key: "leave",
                              label: "Leave Project",
                              onClick: () => handleLeaveProject(project),
                              variant: "leave",
                            },
                          ]}
                        />
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

      {selectedProject && (
        <LeaveProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          projectId={selectedProject.id}
          projectName={selectedProject.title}
        />
      )}
    </>
  );
};
