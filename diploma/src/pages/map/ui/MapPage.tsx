import { BaseMap } from "@shared/ui";
import styles from "./MapPage.module.scss";
import { FilterButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import {
  MapFiltersWidget,
  MapListPanel,
  MapProjectCluster,
} from "@widgets/map";
import { Suspense } from "react";
import { MapBoundsTracker } from "./MapBoundsTracker";
import { SearchLocationLayer } from "./SearchLocationLayer";
import { MapInitialLocation } from "./MapInitialLocation";
import { useMapPage } from "../model/useMapPage.ts";

export const MapPage = () => {
  const {
    navigate,
    search,
    wrapperRef,
    mapSearch,
    listParams,
    searchCoordinates,
    radiusMeters,
    initialLocation,
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
          <MapProjectCluster search={mapSearch} />
        </Suspense>
      </BaseMap>

      <div className={styles.filterButtonWrapper}>
        <FilterButton>
          <MapFiltersWidget search={search} from="/map/" />
        </FilterButton>
        <SearchBar
          onChange={(value) =>
            navigate({
              to: "/map",
              search: (prev) => ({ ...prev, Search: value || undefined }),
            })
          }
          variant="projects"
        />
        <div className={styles.combinedList}>
          <MapListPanel listParams={listParams} page={search.Page} />
        </div>
      </div>
    </div>
  );
};
