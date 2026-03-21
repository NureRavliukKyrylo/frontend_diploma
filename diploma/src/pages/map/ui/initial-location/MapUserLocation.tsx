import { MapZoomAnimation } from "@shared/libs/map";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { UserMarker } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import styles from "../base-page/MapPage.module.scss";

interface MapUserLocationProps {
  coordinates: Coordinates | null;
  animate?: boolean;
  onAnimationEnd?: () => void;
}

export const MapUserLocation = ({
  coordinates,
  animate = true,
  onAnimationEnd,
}: MapUserLocationProps) => {
  const hasFlown = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!coordinates) {
      return;
    }
    if (!animate) {
      return;
    }
    if (!hasFlown.current) {
      hasFlown.current = true;
      setShouldAnimate(true);
    }
  }, [coordinates]);

  if (!coordinates) return null;

  return (
    <>
      {shouldAnimate && (
        <MapZoomAnimation
          coordinates={coordinates}
          zoom={11}
          onAnimationEnd={() => {
            setShouldAnimate(false);
            onAnimationEnd?.();
          }}
        />
      )}
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
