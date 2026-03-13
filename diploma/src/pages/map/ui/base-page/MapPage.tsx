import { BaseMap } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons/index.ts";
import { SearchBar } from "@shared/ui/inputs";
import {
  MapFiltersWidget,
  MapListPanel,
  MapProjectCluster,
} from "@widgets/map";
import { MapBoundsTracker } from "@shared/libs/map/index.ts";
import { SearchLocationLayer } from "../location-layer/SearchLocationLayer.tsx";
import { MapInitialLocation } from "../initial-location/MapInitialLocation.tsx";
import { useMapPage } from "../../model/useMapPage.ts";
import { useQuery } from "@tanstack/react-query";
import { projectQuery } from "@entities/project/index.ts";

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

  const { data } = useQuery(projectQuery.map(mapSearch));

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
        <MapProjectCluster data={data} />
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
