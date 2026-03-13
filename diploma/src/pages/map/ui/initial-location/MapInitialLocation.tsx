import { MapZoomAnimation } from "@shared/libs/map";
import { useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { UserMarker } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import styles from "../base-page/MapPage.module.scss";

interface MapInitialLocationProps {
  coordinates: Coordinates | null;
}

export const MapInitialLocation = ({
  coordinates,
}: MapInitialLocationProps) => {
  const hasFlown = useRef(false);

  if (!coordinates) return null;

  const animatedCoords = hasFlown.current ? null : coordinates;
  hasFlown.current = true;

  return (
    <>
      {animatedCoords && <MapZoomAnimation coordinates={animatedCoords} />}
      <Marker
        position={[coordinates.latitude, coordinates.longitude]}
        icon={UserMarker}
      >
        <Popup className={styles.popupUserLocation}>
          <div className={styles.popupContent}>
            <h1 className={styles.userLocationText}>Your location</h1>
          </div>
        </Popup>
      </Marker>
    </>
  );
};
