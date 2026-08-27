import { MapZoomAnimation, useMapZoomOnce } from "@shared/libs/map";
import { Marker, Popup } from "react-leaflet";
import { UserMarker } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import styles from "./MapUserLocation.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["common"]);
  const { shouldAnimate, stopAnimation } = useMapZoomOnce(coordinates, animate);

  if (!coordinates) return null;

  return (
    <>
      {shouldAnimate && (
        <MapZoomAnimation
          coordinates={coordinates}
          zoom={11}
          onAnimationEnd={() => {
            stopAnimation();
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
            <h1 className={styles.userLocationText}>
              {t("common:map.yourLocation")}
            </h1>
          </div>
        </Popup>
      </Marker>
    </>
  );
};
