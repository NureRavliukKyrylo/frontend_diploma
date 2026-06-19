import { CalendarDays } from "lucide-react";
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
    showClosed
    animation="right"
  >
    <div className={styles.locationMapModal}>
      <MapLocationPicker
        coordinates={coordinates}
        onLocationChange={onLocationChange}
        icon={UserMarker}
        popupClassName={styles.mapPopup}
        popupContent={
          <p className={styles.mapPopupContent}>
            <CalendarDays size={16} />
            Project location
          </p>
        }
      />
    </div>
  </BaseModal>
);
