import { ConfirmationModal } from "@shared/ui/modals";
import styles from "./DeleteFeedbackModal.module.scss";
import { DeleteModal } from "@shared/assets/images/actions";
import type { EntityType } from "@shared/config/types";
import { useDeleteFeedback } from "@entities/feedback";

interface DeleteFeedbackModalProps {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  feedbackId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteFeedbackModal = ({
  entityType,
  entityId,
  feedbackId,
  isOpen,
  onClose,
}: DeleteFeedbackModalProps) => {
  const handleClose = () => {
    mutation.reset();
    onClose();
  };

  const { errorMessage, mutation, handleDeleteFeedback, isLoading } =
    useDeleteFeedback({ entityType, entityId, onSuccess: handleClose });

  const handleDelete = () => {
    handleDeleteFeedback(feedbackId);
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={handleClose}
      onConfirm={handleDelete}
      title={`Delete feedback?`}
      text="Are you sure you want to delete this feedback? You can write new one again anytime."
      maxWidth="628px"
      error={errorMessage}
      isLoading={isLoading}
      cancelText="Cancel"
      confirmText="Delete"
      confirmButtonClassName={styles.confirmButtonSkill}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
    />
  );
};
