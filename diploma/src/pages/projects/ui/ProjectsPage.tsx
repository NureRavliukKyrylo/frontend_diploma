import { ProjectFiltersWidget, ProjectsListWidget } from "@widgets/projects";
import { LoadingComponent, Pagination } from "@shared/ui";
import { Suspense, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FilterButton, LinkButtonWrapper } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { sortingItems } from "../config/sortingItems";
import styles from "./ProjectsPage.module.scss";
import { Planet } from "@shared/assets/images/information";
import { Mark } from "@shared/assets/icons/actions";
import { useQuery } from "@tanstack/react-query";
import { projectQuery } from "@entities/project";
import { motion } from "framer-motion";

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
        <div className={styles.wrapperPlanetProjects}>
          <div className={styles.imageProjects}>
            <img src={Planet} alt="planet" className={styles.planetImage} />
            <img src={Mark} alt="mark" className={styles.markImage} />
          </div>
        </div>
      </div>
      <div className={styles.filterProjectsWrapper}>
        <div className={styles.filtersInteractions}>
          <FilterButton onOpenChange={(value) => setIsFilterOpen(value)}>
            <ProjectFiltersWidget />
          </FilterButton>
          <div className={styles.searchWrapper}>
            <SearchBar
              value={search.search}
              onChange={(value) => {
                navigate({
                  search: (prev) => ({ ...prev, search: value }),
                });
              }}
              variant="projects"
            />
          </div>
          <div className={styles.dropDownWrapper}>
            <SortDropDown
              options={sortingItems}
              onSelect={(value) =>
                navigate({ search: (prev) => ({ ...prev, orderBy: value }) })
              }
              value={search.orderBy}
            />
          </div>
        </div>
        <motion.div
          layout
          transition={{
            layout: {
              type: "spring",
              stiffness: 250,
              damping: 30,
            },
          }}
          className={`${styles.projectsList} ${
            isFilterOpen ? styles.filterOpen : ""
          }`}
        >
          <Suspense
            fallback={
              <LoadingComponent className="flex justify-center items-center w-full h-64" />
            }
          >
            <ProjectsListWidget />
          </Suspense>
        </motion.div>
      </div>
      <div className={styles.paginationWrapper}>
        {projects && (
          <Pagination
            total={3}
            page={search.page}
            onChange={(page) => {
              navigate({
                search: (prev) => ({ ...prev, page }),
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
