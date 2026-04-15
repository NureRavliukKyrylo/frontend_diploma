import { LocationMarker } from "./LocationMarker";
import { MapZoomAnimation } from "@shared/libs/map";
import { useRef } from "react";
import { Circle, Marker, Popup } from "react-leaflet";
import styles from "../base-page/MapPage.module.scss";
import type { MapProjectSearchParams } from "@entities/project";

interface SearchLocationLayerProps {
  coordinates: { latitude: number; longitude: number };
  radiusMeters?: number | null;
  search: MapProjectSearchParams;
}

export const SearchLocationLayer = ({
  coordinates,
  radiusMeters,
  search,
}: SearchLocationLayerProps) => {
  const prevCoordsRef = useRef<{ latitude: number; longitude: number } | null>(
    null,
  );

  const coordsChanged =
    coordinates.latitude !== prevCoordsRef.current?.latitude ||
    coordinates.longitude !== prevCoordsRef.current?.longitude;

  if (coordsChanged) {
    prevCoordsRef.current = coordinates;
  }

  const animatedCoords = coordsChanged ? coordinates : null;

  return (
    <>
      {animatedCoords && <MapZoomAnimation coordinates={animatedCoords} />}
      <Marker
        position={[coordinates.latitude, coordinates.longitude]}
        icon={LocationMarker}
      >
        <Popup className={styles.popupSearchLocation}>
          <div className={styles.popupContent}>
            <h1 className={styles.locationSearchText}>Search area center</h1>
            <span className={styles.locationName}>{search.Location}</span>
            {radiusMeters && (
              <div className={styles.radiusBadge}>
                ⌀ {(radiusMeters / 1000).toFixed(1)} km radius
              </div>
            )}
          </div>
        </Popup>
      </Marker>

      {radiusMeters != null && (
        <Circle
          center={[coordinates.latitude, coordinates.longitude]}
          radius={radiusMeters}
          pathOptions={{
            color: "#F97316",
            fillColor: "#F97316",
            fillOpacity: 0.1,
            weight: 2,
          }}
        />
      )}
    </>
  );
};
