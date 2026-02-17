import { MapLocationPicker } from "@features/map";
import { BaseModal } from "@shared/ui/modals";
import styles from "./MapLocationModal.module.scss";
import type { Coordinates } from "@shared/config/types";

export interface MapLocationModal {
  isMapOpen: boolean;
  onClose: () => void;
  error?: string;
  coordinates: Coordinates | null;
  setCoordinates: (coords: Coordinates) => void;
  popUpText: string;
  maxWidth: string;
}
export const MapLocationModal = ({
  isMapOpen,
  onClose,
  error,
  coordinates,
  setCoordinates,
  popUpText,
  maxWidth,
}: MapLocationModal) => {
  return (
    <BaseModal
      isOpen={isMapOpen}
      onClose={onClose}
      error={error}
      maxWidth={maxWidth}
      showClosed={false}
    >
      <div className={styles.mapModalWrapper}>
        <MapLocationPicker
          coordinates={coordinates}
          onLocationChange={setCoordinates}
          popUpText={popUpText}
        />
      </div>
    </BaseModal>
  );
};
