import { BaseMap } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons/index.ts";
import { SearchBar } from "@shared/ui/inputs";
import {
  MapFiltersWidget,
  MapListPanel,
  MapProjectCluster,
} from "@widgets/map";
import { Suspense } from "react";
import { MapBoundsTracker } from "@shared/libs/index.ts";
import { SearchLocationLayer } from "../location-layer/SearchLocationLayer.tsx";
import { MapInitialLocation } from "../initial-location/MapInitialLocation.tsx";
import { useMapPage } from "../../model/useMapPage.ts";

export const MapPage = () => {
  const {
    search,
    wrapperRef,
    mapSearch,
    listParams,
    searchCoordinates,
    radiusMeters,
    initialLocation,
    handleSearch,
    handleSearchBounds,
  } = useMapPage();

  return (
    <div ref={wrapperRef} className={styles.mapPageWrapper}>
      <BaseMap
        zoomPosition="bottomright"
        fullscreenPosition="bottomleft"
        scrollWheelZoom={false}
        classNameWrapper={styles.mapPage}
        fullscreenRef={wrapperRef}
      >
        <MapInitialLocation coordinates={initialLocation} />
        <MapBoundsTracker onBoundsChange={handleSearchBounds} />
        {searchCoordinates && (
          <SearchLocationLayer
            coordinates={searchCoordinates}
            radiusMeters={radiusMeters}
            search={search}
          />
        )}
        <Suspense fallback={null}>
          <MapProjectCluster search={mapSearch} />
        </Suspense>
      </BaseMap>

      <div className={styles.filterButtonWrapper}>
        <ToggleDropdownButton>
          <MapFiltersWidget search={search} from="/map/" />
        </ToggleDropdownButton>
        <SearchBar onChange={handleSearch} variant="projects" />
        <MapListPanel listParams={listParams} page={search.Page} />
      </div>
    </div>
  );
};
