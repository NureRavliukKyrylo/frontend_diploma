import { BaseModal } from "@shared/ui/modals";
import styles from "./MapLocationModal.module.scss";
import type { Coordinates } from "@shared/config/types";
import { BaseMap } from "../base/BaseMap";
import { Marker, Popup } from "react-leaflet";
import { MapZoomAnimation } from "@shared/libs/map/MapZoomAnimation";

export interface MapLocationModal {
  isMapOpen: boolean;
  onClose: () => void;
  coordinates: Coordinates | null;
  popUpText: string;
  maxWidth: string;
}
export const MapLocationModal = ({
  isMapOpen,
  onClose,
  coordinates,
  popUpText,
  maxWidth,
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
            <Marker position={[coordinates.latitude, coordinates.longitude]}>
              <Popup>{popUpText}</Popup>
            </Marker>
          )}
          <MapZoomAnimation coordinates={coordinates} />
        </BaseMap>
      </div>
    </BaseModal>
  );
};
