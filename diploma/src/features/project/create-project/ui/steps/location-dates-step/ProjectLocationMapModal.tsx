import { MapLocationPicker } from "@features/map";
import { UserMarker } from "@entities/user/profile";
import { BaseModal } from "@shared/ui/modals";
import type { CreateProjectLocation } from "../../../api/createProjectApi";
import styles from "../CreateProjectSteps.module.scss";

interface ProjectLocationMapModalProps {
  isOpen: boolean;
  coordinates: CreateProjectLocation | null;
  onClose: () => void;
  onLocationChange: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
}

export const ProjectLocationMapModal = ({
  isOpen,
  coordinates,
  onClose,
  onLocationChange,
}: ProjectLocationMapModalProps) => (
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
        popupContent={<p className={styles.mapPopupContent}>Project location</p>}
      />
    </div>
  </BaseModal>
);
