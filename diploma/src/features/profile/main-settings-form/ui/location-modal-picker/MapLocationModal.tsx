import { MapLocationPicker } from "@features/map";
import { BaseModal } from "@shared/ui/modals";
import styles from "./MapLocationModal.module.scss";
import type { Coordinates } from "@shared/config/types";
import { UserMarker } from "@entities/user/profile";
import { useTranslation } from "react-i18next";

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
  maxWidth,
}: MapLocationModal) => {
  const { t } = useTranslation("profile");

  return (
    <BaseModal
      isOpen={isMapOpen}
      onClose={onClose}
      error={error}
      maxWidth={maxWidth}
      showClosed={false}
      animation="right"
    >
      <div className={styles.mapModalWrapper}>
        <MapLocationPicker
          coordinates={coordinates}
          onLocationChange={setCoordinates}
          icon={UserMarker}
          popupClassName={styles.popupUserLocation}
          popupContent={
            <div className={styles.popupContent}>
              <h1 className={styles.userLocationText}>
                {t("settings.location.userLocation", {
                  name: t("location.you"),
                })}
              </h1>
            </div>
          }
        />
      </div>
    </BaseModal>
  );
};
