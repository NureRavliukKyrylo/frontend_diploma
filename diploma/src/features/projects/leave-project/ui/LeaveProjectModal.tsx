import { ConfirmationModal } from "@shared/ui/modals";
import styles from "./LeaveProjectModal.module.scss";
import { DeleteModal } from "@shared/assets/images/actions";
import { useLeaveProject } from "../model/useLeaveProject";

interface LeaveProjectModalProps {
  projectId: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveProjectModal = ({
  projectId,
  isOpen,
  projectName,
  onClose,
}: LeaveProjectModalProps) => {
  const handleClose = () => {
    mutation.reset();
    onClose();
  };

  const { errorMessage, mutation, handleLeaveProject, isLoading } =
    useLeaveProject(() => {
      handleClose();
    });

  const handleLeave = () => {
    handleLeaveProject({ entityId: projectId });
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={handleClose}
      onConfirm={handleLeave}
      title={`Leave Project - ${projectName}?`}
      text="Are you sure you want to leave this project? You can always rejoin later."
      maxWidth="628px"
      error={errorMessage}
      isLoading={isLoading}
      cancelText="Cancel"
      confirmText="Leave"
      confirmButtonClassName={styles.confirmLeaveProjectButton}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
    />
  );
};
