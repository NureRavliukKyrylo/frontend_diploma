import { MapLocationPicker } from "@features/map";
import { UserMarker } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";
import { BaseModal } from "@shared/ui/modals";
import styles from "../GeneralTab.module.scss";

interface LocationMapModalProps {
  isOpen: boolean;
  coordinates: Coordinates | null;
  onClose: () => void;
  onLocationChange: (coordinates: Coordinates) => void;
}

export const LocationMapModal = ({
  isOpen,
  coordinates,
  onClose,
  onLocationChange,
}: LocationMapModalProps) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    maxWidth="920px"
    showClosed={false}
    animation="right"
  >
    <div className={styles.locationMapModal}>
      <MapLocationPicker
        coordinates={coordinates}
        onLocationChange={onLocationChange}
        icon={UserMarker}
        popupClassName={styles.locationPopup}
        popupContent={
          <div className={styles.locationPopupContent}>
            <h2>Organization location</h2>
          </div>
        }
      />
    </div>
  </BaseModal>
);
