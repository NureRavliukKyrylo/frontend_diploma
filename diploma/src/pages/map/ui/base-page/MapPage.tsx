import { BaseMap, map } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons/index.ts";
import { SearchBar } from "@shared/ui/inputs";
import {
  MapFiltersWidget,
  MapListPanel,
  MapProjectCluster,
} from "@widgets/map";
import { MapBoundsTracker, MapInitialBounds } from "@shared/libs/map/index.ts";
import { SearchLocationLayer } from "../location-layer/SearchLocationLayer.tsx";
import { MapUserLocation } from "../initial-location/MapUserLocation.tsx";
import { useMapPage } from "../../model/useMapPage.ts";
import { useQuery } from "@tanstack/react-query";
import { projectQuery } from "@entities/project";
import { useRef, useState } from "react";

export const MapPage = () => {
  const {
    search,
    wrapperRef,
    mapSearch,
    listParams,
    radiusMeters,
    searchCoordinates,
    hasBounds,
    initialCoords,
    initialZoom,
    handleSearch,
    handleSearchBounds,
    userLocation,
  } = useMapPage();

  const { data } = useQuery(projectQuery.map(mapSearch));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const boundsReadyRef = useRef<() => void>(() => {});
  return (
    <div ref={wrapperRef} className={styles.mapPageWrapper}>
      <BaseMap
        zoomPosition="bottomright"
        fullscreenPosition="bottomleft"
        scrollWheelZoom={false}
        classNameWrapper={styles.mapPage}
        fullscreenRef={wrapperRef}
        zoom={!hasBounds ? initialZoom : undefined}
        center={
          !hasBounds && initialCoords
            ? [initialCoords.latitude, initialCoords.longitude]
            : undefined
        }
      >
        {hasBounds && (
          <MapInitialBounds
            minLat={search.MinLat!}
            maxLat={search.MaxLat!}
            minLng={search.MinLng!}
            maxLng={search.MaxLng!}
          />
        )}
        <MapUserLocation
          coordinates={userLocation}
          animate={!searchCoordinates && !hasBounds}
          onAnimationEnd={() => boundsReadyRef.current()}
        />
        <MapBoundsTracker
          onBoundsChange={handleSearchBounds}
          readyRef={boundsReadyRef}
        />
        {searchCoordinates && (
          <SearchLocationLayer
            coordinates={searchCoordinates}
            radiusMeters={radiusMeters}
            search={search}
          />
        )}
        <MapProjectCluster selectedId={selectedId} data={data} />
      </BaseMap>

      <div className={styles.filterButtonWrapper}>
        <ToggleDropdownButton>
          <MapFiltersWidget search={search} />
        </ToggleDropdownButton>
        <SearchBar
          onChange={handleSearch}
          value={search.Search}
          variant="projects"
        />
        <MapListPanel
          listParams={listParams}
          page={search.Page}
          onSelectProject={(id, lat, lng) => {
            setSelectedId(id);
            map.flyTo(lat, lng, 16);
          }}
        />
      </div>
    </div>
  );
};
