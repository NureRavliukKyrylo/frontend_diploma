import { ConfirmationModal } from "@shared/ui/modals";
import { DeleteModal } from "@shared/assets/images/actions";
import { useLeaveParticipation } from "../../model/useLeaveParticipation";
import styles from "./LeaveConfirmationModal.module.scss";
import type { EntityType } from "@shared/config/types";

interface LeaveConfirmationModalProps {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  entityName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const LeaveConfirmationModal = ({
  entityType,
  entityId,
  entityName,
  isOpen,
  onClose,
  onSuccess,
}: LeaveConfirmationModalProps) => {
  const { handleLeave, resetLeave, isLoading, error } = useLeaveParticipation({
    entityType,
    entityId,
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  const handleClose = () => {
    resetLeave();
    onClose();
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={handleClose}
      onConfirm={() => handleLeave()}
      title={`Leave ${entityName}?`}
      text="Are you sure you want to leave? You can always rejoin later."
      maxWidth="628px"
      error={error}
      isLoading={isLoading}
      cancelText="Cancel"
      confirmText="Leave"
      confirmButtonClassName={styles.confirmButton}
      image={DeleteModal}
      imageClassName={styles.image}
    />
  );
};
