import { BaseMap, map } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { FilterButton } from "@shared/ui/buttons";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { SearchBar } from "@shared/ui/inputs";
import {
  CombinedListWidget,
  MapFiltersWidget,
  OrganizationMarkersWidget,
  ProjectMarkersWidget,
} from "@widgets/map";
import { Suspense, useRef } from "react";
import { ListProjectCard, ProjectMarker } from "@entities/project";
import { Marker, Popup } from "react-leaflet";
import { MapBoundsTracker } from "./MapBoundsTracker";
import { SearchLocationLayer } from "./SearchLocationLayer";
import {
  ListOrganizationCard,
  OrganizationMarker,
} from "@entities/organization";
import { DefaultAvatar } from "@shared/assets/images/user";

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
          <OrganizationMarkersWidget
            search={mapSearch}
            renderMarker={(organization) => {
              const lat = organization.location?.latitude;
              const lng = organization.location?.longitude;

              if (!lat || !lng) return null;

              return (
                <Marker
                  key={organization.id}
                  position={[lat, lng]}
                  icon={OrganizationMarker}
                >
                  <Popup className={styles.popupOrganization}>
                    <div className={styles.popupOrganizationContent}>
                      <img
                        src={organization.logoUrl ?? DefaultAvatar}
                        alt="image-organization"
                      />
                      <h1>{organization.name}</h1>
                      <p>{organization.description}</p>
                      <Link
                        to="/organizations/$id"
                        params={{ id: organization.id }}
                        className={styles.seeMoreButtonOrganizayion}
                      >
                        see more
                      </Link>
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
              search: (prev) => ({ ...prev, Search: value }),
            });
          }}
          variant="projects"
        />
        <div className={styles.combinedList}>
          <FilterButton>
            <CombinedListWidget
              organizationParams={{
                Page: search.Page,
                pageSize: search.pageSize,
              }}
              projectParams={{ Page: search.Page, pageSize: search.pageSize }}
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
              renderOrganizationCard={(organization) => (
                <div
                  onClick={() => {
                    const lat = organization.location?.latitude;
                    const lng = organization.location?.longitude;
                    if (lat && lng) map.flyTo(lat, lng, 12);
                  }}
                >
                  <ListOrganizationCard
                    key={`org-${organization.id}`}
                    name={organization.name}
                    image={organization.logoUrl ?? DefaultAvatar}
                  />
                </div>
              )}
            />
          </FilterButton>
        </div>
      </div>
    </div>
  );
};
