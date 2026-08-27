import { ConfirmationModal } from "@shared/ui/modals";
import styles from "./DeleteFeedbackModal.module.scss";
import { DeleteModal } from "@shared/assets/images/actions";
import type { EntityType } from "@shared/config/types";
import { useDeleteFeedback } from "@entities/feedback";
import { useTranslation } from "react-i18next";

interface DeleteFeedbackModalProps {
  entityType: EntityType;
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
  const { t } = useTranslation(["feedback"]);

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
      title={t("feedback:deleteModal.title")}
      text={t("feedback:deleteModal.text")}
      maxWidth="628px"
      error={errorMessage}
      isLoading={isLoading}
      cancelText={t("feedback:actions.cancel")}
      confirmText={t("feedback:actions.delete")}
      confirmButtonClassName={styles.confirmButtonSkill}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
    />
  );
};
