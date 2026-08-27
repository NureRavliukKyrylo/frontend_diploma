import { ConfirmationModal } from "@shared/ui/modals";
import { DeleteModal } from "@shared/assets/images/actions";
import { useLeaveParticipation } from "../../model/useLeaveParticipation";
import styles from "./LeaveConfirmationModal.module.scss";
import type { EntityType } from "@shared/config/types";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  const { handleLeave, resetLeave, isLoading, error } = useLeaveParticipation({
    entityType,
    entityId,
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={() => {
        resetLeave();
        onClose();
      }}
      onConfirm={() => handleLeave()}
      title={t("participation.leaveTitle", { name: entityName })}
      text={t("participation.leaveText")}
      maxWidth="628px"
      error={error}
      isLoading={isLoading}
      cancelText={t("actions.cancel")}
      confirmText={t("participation.leaveConfirm")}
      confirmButtonClassName={styles.confirmButton}
      image={DeleteModal}
      imageClassName={styles.image}
    />
  );
};
