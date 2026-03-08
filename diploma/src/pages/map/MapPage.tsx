import { BaseMap, map, Pagination } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { FilterButton } from "@shared/ui/buttons";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { SearchBar } from "@shared/ui/inputs";
import {
  CombinedListWidget,
  MapFiltersWidget,
  ProjectMarkersWidget,
} from "@widgets/map";
import { Suspense, useRef } from "react";
import {
  ListProjectCard,
  ProjectMarker,
  projectQuery,
} from "@entities/project";
import { Marker, Popup } from "react-leaflet";
import { MapBoundsTracker } from "./MapBoundsTracker";
import { SearchLocationLayer } from "./SearchLocationLayer";
import { DefaultAvatar } from "@shared/assets/images/user";
import { useQuery } from "@tanstack/react-query";

export const MapPage = () => {
  const navigate = useNavigate({ from: "/map/" });
  const search = useSearch({ from: "/_masterLayout/map/" });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { Page, pageSize, ...mapSearch } = search;
  const searchCoordinates =
    search.Lat != null && search.Lng != null
      ? { latitude: search.Lat, longitude: search.Lng }
      : null;

  const radiusMeters = search.RadiusKm != null ? search.RadiusKm * 1000 : null;

  const { data: projects } = useQuery(projectQuery.map(search));

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
              search: (prev) => ({ ...prev, ...bounds }),
              replace: true,
              resetScroll: false,
            })
          }
        />

        {searchCoordinates && (
          <SearchLocationLayer
            coordinates={searchCoordinates}
            radiusMeters={radiusMeters}
          />
        )}
        <Suspense fallback={null}>
          <ProjectMarkersWidget
            search={mapSearch}
            renderMarker={(project) => {
              const lat = project.location?.latitude;
              const lng = project.location?.longitude;

              if (!lat || !lng) return null;

              return (
                <Marker
                  key={project.id}
                  position={[lat, lng]}
                  icon={ProjectMarker}
                >
                  <Popup className={styles.popupProject}>
                    <div className={styles.popupProjectContent}>
                      <div className={styles.projectInfo}>
                        <h1>{project.title}</h1>
                        <p>{project.description}</p>
                        <Link
                          to="/projects/$id"
                          params={{ id: project.id }}
                          className={styles.seeMoreButtonProject}
                        >
                          see more
                        </Link>
                      </div>
                      <div className={styles.organizationProjectInfo}>
                        <div className={styles.organizationImage}>
                          <img
                            src={project.organization?.logoUrl ?? DefaultAvatar}
                            alt="image-organization"
                          />
                          <h1>{project.organization?.name}</h1>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            }}
          />
        </Suspense>
      </BaseMap>

      <div className={styles.filterButtonWrapper}>
        <FilterButton>
          <MapFiltersWidget search={search} from="/map/" />
        </FilterButton>
        <SearchBar
          onChange={(value) => {
            navigate({
              to: "/map",
              search: (prev) => ({ ...prev, Search: value || undefined }),
            });
          }}
          variant="projects"
        />
        <div className={styles.combinedList}>
          <FilterButton>
            <Suspense fallback={"Loading..."}>
              <CombinedListWidget
                projectParams={search}
                renderProjectCard={(project) => (
                  <div
                    onClick={() => {
                      const lat = project.location?.latitude;
                      const lng = project.location?.longitude;
                      if (lat && lng) map.flyTo(lat, lng, 12);
                    }}
                  >
                    <ListProjectCard
                      key={`proj-${project.id}`}
                      name={project.title}
                    />
                  </div>
                )}
              />
            </Suspense>
            {projects && projects.pagination.totalPages > 1 && (
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
          </FilterButton>
        </div>
      </div>
    </div>
  );
};
