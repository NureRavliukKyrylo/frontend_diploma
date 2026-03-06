import {
  ProjectFiltersWidget,
  ProjectsListWidget,
  ProjectsListWidgetSkeleton,
} from "@widgets/projects";
import { Pagination } from "@shared/ui";
import { Suspense, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { FilterButton, LinkButtonWrapper } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { sortingItems } from "../config/sortingItems";
import styles from "./ProjectsPage.module.scss";
import { ProjectsLogo } from "@shared/assets/images/information";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard, projectQuery } from "@entities/project";
import { motion } from "framer-motion";
import { formatDateToInput } from "@shared/libs";
import { DefaultAvatar } from "@shared/assets/images/user";

export function ProjectsPage() {
  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: projects } = useQuery(projectQuery.list(search));

  return (
    <div className={styles.projectsWrapper}>
      <div className={styles.projectHeader}>
        <div className={styles.projectsInformation}>
          <div className={styles.textProjects}>
            <h1>Explore projects around the world</h1>
            <h2>Discover where volunteers are making an impact</h2>
          </div>
          <div className={styles.projectsDescription}>
            <p>
              Use our interactive world map to explore active and completed
              volunteer projects — from rebuilding schools and organizing
              community events to environmental clean-ups and humanitarian aid.
              Each pin on the map represents real people, real stories, and real
              change. Find out where help is needed most, learn more about each
              project, and get involved — locally or across the globe.
            </p>
            <LinkButtonWrapper to="/map" className={styles.mapButton}>
              MAP
            </LinkButtonWrapper>
          </div>
        </div>
        <div className={styles.imageProjects}>
          <img src={ProjectsLogo} alt="projects" />
        </div>
      </div>
      <div className={styles.mainProjectsSection}>
        <div className={styles.filterProjectsWrapper}>
          <div className={styles.filtersInteractions}>
            <FilterButton onOpenChange={(value) => setIsFilterOpen(value)}>
              <ProjectFiltersWidget search={search} from="/projects/" />
            </FilterButton>
            <SearchBar
              value={search.Search}
              onChange={(value) => {
                navigate({
                  search: (prev) => ({
                    ...prev,
                    Search: value || undefined,
                    Page: 1,
                  }),
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
              value={search.OrderBy}
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
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{
                        ease: "easeIn",
                        duration: 0.2,
                      }}
                    >
                      <Link to="/projects/$id" params={{ id: project.id }}>
                        <ProjectCard
                          key={project.id}
                          image={project.organization?.logoUrl ?? DefaultAvatar}
                          name={
                            project.organization?.name ?? "Unknown Organization"
                          }
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
                      </Link>
                    </motion.div>
                  )}
                  search={search}
                />
              </Suspense>
            )}
          </motion.div>
        </div>
        {projects && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={projects.pagination.totalPages}
              page={search.Page}
              onChange={(page) => {
                navigate({
                  search: (prev) => ({ ...prev, Page: page }),
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
