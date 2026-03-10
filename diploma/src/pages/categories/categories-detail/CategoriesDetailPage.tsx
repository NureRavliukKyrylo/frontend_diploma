import { CategoryDetailWidget } from "@widgets/categories";
import { Suspense } from "react";
import styles from "./CategoriesDetailPage.module.scss";
import { motion } from "framer-motion";
import {
  ProjectControls,
  ProjectsListWidget,
  ProjectsListWidgetSkeleton,
} from "@widgets/projects";
import { CategoryProjectFiltersWidget } from "@widgets/categories";
import { ProjectCard, projectQuery } from "@entities/project";
import { Pagination } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { useCategoryDetailPage } from "./model/useCategoryDetailPage";

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
  const { data: projects } = useQuery(projectQuery.list(searchWithCategory));

  return (
    <div className={styles.projectsCategoryWrapper}>
      <CategoryDetailWidget />
      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <ProjectControls
            search={search}
            onSearch={handleSearch}
            onSort={handleSort}
            onFilterOpen={setIsFilterOpen}
          >
            <CategoryProjectFiltersWidget
              search={searchWithCategory}
              from="/categories/$id/"
            />
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
            <Suspense fallback={<ProjectsListWidgetSkeleton />}>
              <ProjectsListWidget
                renderCard={(project) => (
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
                )}
                search={searchWithCategory}
              />
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
