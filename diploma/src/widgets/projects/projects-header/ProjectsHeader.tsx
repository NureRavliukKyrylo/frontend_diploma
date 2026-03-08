import { LinkButtonWrapper } from "@shared/ui/buttons";
import styles from "./ProjectsHeader.module.scss";
import { ProjectsLogo } from "@shared/assets/images/information";
import type { MapProjectSearchParams } from "@entities/project";

interface ProjectsHeaderProps {
  search: MapProjectSearchParams;
}
export const ProjectsHeader = ({ search }: ProjectsHeaderProps) => {
  const mapSearch: MapProjectSearchParams = {
    Lat: search.Lat,
    Lng: search.Lng,
    Location: search.Location,
    RadiusKm: search.RadiusKm,
    CategoryIds: search.CategoryIds,
    OnlyActive: search.OnlyActive,
    ShowJoined: search.ShowJoined,
    Search: search.Search,
  };

  return (
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
          <LinkButtonWrapper
            to="/map"
            search={mapSearch}
            className={styles.mapButton}
          >
            MAP
          </LinkButtonWrapper>
        </div>
      </div>
      <div className={styles.imageProjects}>
        <img src={ProjectsLogo} alt="projects" />
      </div>
    </div>
  );
};
