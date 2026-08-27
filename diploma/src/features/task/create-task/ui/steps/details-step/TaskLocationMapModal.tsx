import { MapLocationPicker } from "@features/map";
import { UserMarker } from "@entities/user/profile";
import { BaseModal } from "@shared/ui/modals";
import type { CreateTaskLocation } from "../../../api/createTaskApi";
import styles from "../../CreateTaskDrawer.module.scss";

interface TaskLocationMapModalProps {
  isOpen: boolean;
  coordinates: CreateTaskLocation | null;
  onClose: () => void;
  onLocationChange: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
}

export const TaskLocationMapModal = ({
  isOpen,
  coordinates,
  onClose,
  onLocationChange,
}: TaskLocationMapModalProps) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    maxWidth="920px"
    showClosed
    animation="right"
  >
    <div className={styles.mapModal}>
      <MapLocationPicker
        coordinates={coordinates}
        onLocationChange={onLocationChange}
        icon={UserMarker}
        popupClassName={styles.mapPopup}
        popupContent={<p className={styles.mapPopupContent}>Task location</p>}
      />
    </div>
  </BaseModal>
);
