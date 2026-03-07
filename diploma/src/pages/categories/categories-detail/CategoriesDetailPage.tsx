import { CategoryDetailWidget } from "@widgets/categories";
import { FilterButton } from "@shared/ui/buttons";
import { Suspense, useState } from "react";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import styles from "./CategoriesDetailPage.module.scss";
import { motion } from "framer-motion";
import {
  ProjectsListWidget,
  ProjectsListWidgetSkeleton,
} from "@widgets/projects";
import { sortingItems } from "./config/sortingItems";
import { CategoryProjectFiltersWidget } from "@widgets/categories";
import { ProjectCard, projectQuery } from "@entities/project";
import { formatDateToInput } from "@shared/libs";
import { Pagination } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { DefaultAvatar } from "@shared/assets/images/user";

export function CategoryDetailPage() {
  const navigate = useNavigate({ from: "/categories/$id/" });
  const search = useSearch({ from: "/_masterLayout/categories/$id/" });
  const { id } = useParams({ from: "/_masterLayout/categories/$id/" });
  const { data: projects } = useQuery(projectQuery.list(search));

  const searchWithCategory = {
    ...search,
    CategoryIds: [id],
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className={styles.projectsCategoryWrapper}>
      <CategoryDetailWidget />
      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <FilterButton onOpenChange={(value) => setIsFilterOpen(value)}>
            <CategoryProjectFiltersWidget
              search={searchWithCategory}
              from="/categories/$id/"
            />
          </FilterButton>
          <SearchBar
            value={search.Search}
            onChange={(value) => {
              navigate({
                search: (prev) => ({ ...prev, Search: value, Page: 1 }),
                resetScroll: false,
              });
            }}
            variant="projects"
          />
          <SortDropDown
            options={sortingItems}
            onSelect={(value) =>
              navigate({
                search: (prev) => ({ ...prev, OrderBy: value, Page: 1 }),
                resetScroll: false,
              })
            }
            value={search.OrderBy ?? "Default"}
          />
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
                    image={project.organization?.logoUrl ?? DefaultAvatar}
                    name={project.organization?.name ?? "Unknown Organization"}
                    title={project.title}
                    description={project.description}
                    deadline={formatDateToInput(project.endAt)}
                    progress={project.progressPercent}
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
                    tasks={project.tasksTotal}
                  />
                )}
                search={searchWithCategory}
              />
            </Suspense>
          )}
        </motion.div>
      </div>
      <div className={styles.paginationWrapper}>
        {projects && (
          <Pagination
            total={projects.pagination.totalPages}
            page={search.Page}
            onChange={(page) => {
              navigate({
                search: (prev) => ({ ...prev, Page: page }),
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
