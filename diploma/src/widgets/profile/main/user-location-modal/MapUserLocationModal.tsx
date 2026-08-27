import { BaseModal } from "@shared/ui/modals";
import styles from "./MapUserLocationModal.module.scss";
import type { Coordinates } from "@shared/config/types";
import { BaseMap } from "@shared/ui";
import { Marker, Popup } from "react-leaflet";
import { MapZoomAnimation } from "@shared/libs/map";
import { UserMarker } from "@entities/user/profile";
import { useTranslation } from "react-i18next";

export interface MapUserLocationModalProps {
  fullName: string;
  coordinates: Coordinates | null;
  handleModal: () => void;
  isOpen: boolean;
}

export const MapUserLocationModal = ({
  coordinates,
  fullName,
  handleModal,
  isOpen,
}: MapUserLocationModalProps) => {
  const { t } = useTranslation("profile");

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleModal}
      maxWidth={"1200px"}
      showClosed={false}
      animation="right"
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
              icon={UserMarker}
            >
              <Popup className={styles.popupUserLocation}>
                <div className={styles.popupContent}>
                  <h1 className={styles.userLocationText}>
                    {t("location.userLocation", { name: fullName })}
                  </h1>
                </div>
              </Popup>
            </Marker>
          )}
          <MapZoomAnimation coordinates={coordinates} />
        </BaseMap>
      </div>
    </BaseModal>
  );
};
