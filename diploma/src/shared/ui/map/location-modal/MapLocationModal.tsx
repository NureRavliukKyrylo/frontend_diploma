import { BaseModal } from "@shared/ui/modals";
import styles from "./MapLocationModal.module.scss";
import type { Coordinates } from "@shared/config/types";
import { BaseMap } from "../base/BaseMap";
import { Marker, Popup } from "react-leaflet";
import { MapZoomAnimation } from "@shared/libs/map/MapZoomAnimation";
import type { Icon } from "leaflet";

export interface MapLocationModal {
  isMapOpen: boolean;
  onClose: () => void;
  coordinates: Coordinates | null;
  popUpText: string;
  maxWidth: string;
  icon: Icon;
}
export const MapLocationModal = ({
  isMapOpen,
  onClose,
  coordinates,
  popUpText,
  maxWidth,
  icon,
}: MapLocationModal) => {
  return (
    <BaseModal
      isOpen={isMapOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      showClosed={false}
    >
      <div className={styles.mapModalWrapper}>
        <BaseMap
          center={
            coordinates
              ? [coordinates.latitude, coordinates.longitude]
              : undefined
          }
        >
          {coordinates && (
            <Marker
              position={[coordinates.latitude, coordinates.longitude]}
              icon={icon}
            >
              <Popup>{popUpText}</Popup>
            </Marker>
          )}
          <MapZoomAnimation coordinates={coordinates} />
        </BaseMap>
      </div>
    </BaseModal>
  );
};
