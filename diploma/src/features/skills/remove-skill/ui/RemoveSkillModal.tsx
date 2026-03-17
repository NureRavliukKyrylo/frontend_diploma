import { ConfirmationModal } from "@shared/ui/modals";
import { useRemoveSkill } from "../model/useRemoveSkill";
import styles from "./RemoveSkillModal.module.scss";
import { DeleteModal } from "@shared/assets/images/actions";

interface RemoveSkillModalProps {
  skillId: string;
  skillName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RemoveSkillModal = ({
  skillId,
  isOpen,
  skillName,
  onClose,
}: RemoveSkillModalProps) => {
  const handleClose = () => {
    mutation.reset();
    onClose();
  };

  const { errorMessage, mutation, handleRemoveSkill, isLoading } =
    useRemoveSkill(() => {
      handleClose();
    });

  const handleRemove = () => {
    handleRemoveSkill({ skillId });
  };
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={handleClose}
      onConfirm={handleRemove}
      title={`Remove skill - ${skillName}?`}
      text="Are you sure you want to remove this skill? You can add it again anytime."
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
