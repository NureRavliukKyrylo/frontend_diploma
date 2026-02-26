import { ProjectFiltersWidget, ProjectsListWidget } from "@widgets/projects";
import { Pagination } from "@shared/ui";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { FilterButton, LinkButtonWrapper } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { sortingItems } from "../config/sortingItems";
import styles from "./ProjectsPage.module.scss";
import { Planet } from "@shared/assets/images/information";
import { Mark } from "@shared/assets/icons/actions";

export function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const demoProjects = [
    {
      id: "1",
      imageOrganization: "https://placehold.co/80x80",
      nameOrganization: "Helping Hands",
      titleProject: "Food Distribution for Homeless",
      descriptionProject:
        "We organize weekly food distribution events supporting over 300 homeless individuals. Volunteers help package, transport, and hand out meals while engaging with the community.",
    },
    {
      id: "2",
      imageOrganization: "https://placehold.co/80x80/ffb300/000",
      nameOrganization: "Green Earth",
      titleProject: "City Park Cleanup Initiative",
      descriptionProject:
        "Our eco-volunteer teams keep the parks clean, recycle collected materials properly, and collaborate with local authorities to maintain sustainable green areas.",
    },
    {
      id: "3",
      imageOrganization: "https://placehold.co/80x80/00aaff/000",
      nameOrganization: "Animal Rescue Group",
      titleProject: "Pet Adoption Marathon",
      descriptionProject:
        "A month-long program where volunteers help rescued animals find new homes. Includes social media promotion, photography, adoption events, and coordination with shelters.",
    },
    {
      id: "4",
      imageOrganization: "https://placehold.co/80x80/00aaff/000",
      nameOrganization: "Animal Rescue Group",
      titleProject: "Pet Adoption Marathon",
      descriptionProject:
        "A month-long program where volunteers help rescued animals find new homes. Includes social media promotion, photography, adoption events, and coordination with shelters.",
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = demoProjects.slice(startIndex, endIndex);

  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });

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
      <div className={styles.filtersInteractions}>
        <FilterButton>
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
        <SortDropDown
          options={sortingItems}
          onSelect={(value) =>
            navigate({ search: (prev) => ({ ...prev, orderBy: value }) })
          }
          value={search.orderBy}
        />
      </div>
      {/*
      <ProjectsListWidget projects={currentProjects} />
      <FilterButton>
        <ProjectFiltersWidget />
      </FilterButton>
      <SortDropDown
        options={sortingItems}
        onSelect={(value) =>
          navigate({ search: (prev) => ({ ...prev, orderBy: value }) })
        }
        value={search.orderBy}
      />
      <Pagination
        total={10}
        page={search.page}
        onChange={(page) => {
          navigate({
            search: (prev) => ({ ...prev, page }),
          });
        }}
      />*/}
    </div>
  );
}
