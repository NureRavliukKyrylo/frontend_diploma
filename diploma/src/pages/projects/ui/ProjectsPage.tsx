import {
  ProjectControls,
  ProjectFiltersWidget,
  ProjectsHeader,
  ProjectsListWidget,
  ProjectsListWidgetSkeleton,
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
import { motion } from "framer-motion";
import { useProjectsPage } from "../model/useProjectsPage";

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
      <ProjectsHeader search={search} />
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
            transition={{
              layout: {
                ease: "backOut",
                duration: 0.4,
              },
            }}
            className={`${styles.projectsList} ${
              isFilterOpen ? styles.filterOpen : ""
            }`}
          >
            {projects?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No projects found</h2>
                <p>Try adjusting your filters or search query</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ProjectsListWidgetSkeleton
                    renderSkeleton={ProjectCardSkeleton}
                  />
                }
              >
                <ProjectsListWidget
                  renderCard={(project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{
                        ease: "easeIn",
                        duration: 0.2,
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
                        key={project.id}
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
