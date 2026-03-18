import {
  ProjectControls,
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
  useProjectsListQuery,
} from "@entities/project";
import { AnimatePresence, motion } from "framer-motion";
import { useProjectsPage } from "../model/useProjectsPage";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ProjectsHeader search={search} />
      </motion.div>
      <div className={styles.mainProjectsSection}>
        <div className={styles.filterProjectsWrapper}>
          <div className={styles.filtersInteractions}>
            <ProjectControls
              search={search}
              onSearch={handleSearch}
              onSort={handleSort}
              onFilterOpen={setIsFilterOpen}
            >
              <ProjectFiltersWidget search={search} from="/projects/" />
            </ProjectControls>
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
                          <ProjectCard
                            project={project}
                            avatars={[
                              {
                                src: "https://impactflowavatar.blob.core.windows.net/avatar/avatars/8f62543b-1f21-4927-93cd-d873d3ed3e51.jpg",
                                name: "Kyrylo",
                              },
                              {
                                src: "https://impactflowavatar.blob.core.windows.net/avatar/avatars/8f62543b-1f21-4927-93cd-d873d3ed3e51.jpg",
                                name: "Kyrylo",
                              },
                              {
                                src: "https://impactflowavatar.blob.core.windows.net/avatar/avatars/8f62543b-1f21-4927-93cd-d873d3ed3e51.jpg",
                                name: "Kyrylo",
                              },
                            ]}
                          />
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
