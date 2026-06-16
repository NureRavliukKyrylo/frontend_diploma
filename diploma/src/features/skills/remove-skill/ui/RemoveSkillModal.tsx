import { ConfirmationModal } from "@shared/ui/modals";
import { useRemoveSkill } from "../model/useRemoveSkill";
import styles from "./RemoveSkillModal.module.scss";
import { DeleteModal } from "@shared/assets/images/actions";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("skill");

  const handleClose = () => {
    mutation.reset();
    onClose();
  };

  const { errorMessage, mutation, handleRemoveSkill, isLoading } =
    useRemoveSkill(() => handleClose());

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={handleClose}
      onConfirm={() => handleRemoveSkill({ skillId })}
      title={t("skills.remove.modalTitle", { name: skillName })}
      text={t("skills.remove.modalText")}
      maxWidth="628px"
      error={errorMessage}
      isLoading={isLoading}
      cancelText={t("skills.remove.cancel")}
      confirmText={t("skills.remove.confirm")}
      confirmButtonClassName={styles.confirmButtonSkill}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
    />
  );
};
