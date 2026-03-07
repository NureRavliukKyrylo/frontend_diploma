import { BaseMap } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { FilterButton } from "@shared/ui/buttons";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchBar } from "@shared/ui/inputs";
import { MapFiltersWidget, ProjectMarkersWidget } from "@widgets/map";
import { useRef } from "react";
import { ProjectMarker } from "@entities/project";
import { Marker } from "react-leaflet";
import { MapBoundsTracker } from "./MapBoundsTracker";

export const MapPage = () => {
  const navigate = useNavigate({ from: "/map/" });
  const search = useSearch({ from: "/_masterLayout/map/" });
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} className={styles.mapPageWrapper}>
      <BaseMap
        zoomPosition="bottomright"
        fullscreenPosition="bottomleft"
        scrollWheelZoom={false}
        classNameWrapper={styles.mapPage}
        fullscreenRef={wrapperRef}
      >
        <MapBoundsTracker
          onBoundsChange={(bounds) =>
            navigate({
              to: "/map",
              search: (prev) => ({ ...prev, ...bounds }),
              replace: true,
            })
          }
        />
        <ProjectMarkersWidget
          search={search}
          renderMarker={(project) => {
            const lat = project.location[0]?.latitude;
            const lng = project.location[0]?.longitude;

            if (!lat || !lng) return null;

            return (
              <Marker
                key={project.id}
                position={[lat, lng]}
                icon={ProjectMarker}
              />
            );
          }}
        />
      </BaseMap>
      <div className={styles.filterButtonWrapper}>
        <FilterButton>
          <MapFiltersWidget search={search} from="/map/" />
        </FilterButton>
        <SearchBar
          onChange={(value) => {
            navigate({
              to: "/map",
              search: (prev) => ({ ...prev, Search: value }),
            });
          }}
          variant="projects"
        />
      </div>
    </div>
  );
};
