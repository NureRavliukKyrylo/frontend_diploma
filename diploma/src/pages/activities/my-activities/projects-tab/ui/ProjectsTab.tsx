import styles from "./ProjectsTab.module.scss";
import { LinkButtonWrapper, ToggleDropdownButton } from "@shared/ui/buttons";
import { MyProjectsFilterWidget, ProjectsListWidget } from "@widgets/projects";
import { useProjectsTab } from "../model/useProjectsTab";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import {
  ProjectControlCard,
  ProjectControlCardSkeleton,
  getSortingProjectItems,
  useMyProjectsListQuery,
  type MyProjectsRequestParams,
  type MyProjectsSearchParams,
} from "@entities/project";
import { Pagination } from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import {
  layoutTransition,
  fadeVariants,
  fadeDuration,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";
import { LeaveConfirmationModal } from "@features/participation";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

interface ProjectsTabProps {
  search: MyProjectsSearchParams;
}

export const ProjectsTab = ({ search }: ProjectsTabProps) => {
  const { t } = useTranslation(["activities", "common"]);
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
    <div className={styles.mainMyProjectsSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
            <p className="errorHint">{t("common:errors.errorHint")}</p>
          </div>
        )}
      >
        <div className={styles.filtersBlock}>
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <MyProjectsFilterWidget
              search={search as MyProjectsRequestParams}
            />
          </ToggleDropdownButton>
          <SearchBar
            value={search.Search}
            onChange={handleSearch}
            variant="projects"
          />
          <SortDropDown
            options={getSortingProjectItems(t)}
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
                  <h2>{t("activities:my.projects.notFound")}</h2>
                  <p>{t("activities:my.projects.notFoundHint")}</p>
                </>
              ) : (
                <>
                  <h2>{t("activities:my.projects.empty")}</h2>
                  <p>{t("activities:my.projects.emptyHint")}</p>
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
                              label: t("common:participation.leave", {
                                entity: t(
                                  `common:participation.entitiesAccusative.project`,
                                ),
                              }),
                              onClick: () => handleLeaveProject(project),
                              variant: "leave",
                            },
                          ]}
                          actionButton={
                            <motion.div
                              whileHover={{
                                scale: 1.03,
                                backgroundColor: "#000000",
                                color: "#ffffff",
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className={styles.learnMoreMyProject}
                            >
                              <LinkButtonWrapper
                                to="/projects/my/$id"
                                params={{ id: project.id }}
                                className={styles.btnLink}
                              >
                                {t("common:actions.getStarted")}
                              </LinkButtonWrapper>
                            </motion.div>
                          }
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
          <LeaveConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            entityId={selectedProject.id}
            entityType="project"
            entityName={selectedProject.title}
          />
        )}
      </ErrorBoundary>
    </div>
  );
};
