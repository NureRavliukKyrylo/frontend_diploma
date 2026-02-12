import { MapLocationPicker } from "@shared/ui";
import { BaseModal } from "@shared/ui/modals";
import { type Coordinates } from "@entities/user";
import styles from "./MapLocationModal.module.scss";

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
