import { ConfirmationModal } from "@shared/ui/modals";
import { useDeleteProfile } from "../../model/useDeleteProfile";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeleteProfileModal.module.scss";
import { useTranslation } from "react-i18next";

interface DeleteProfileModal {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteProfileModal = ({ isOpen, onClose }: DeleteProfileModal) => {
  const { t } = useTranslation("profile");
  const { deleteProfile, isLoading, errorMessage } = useDeleteProfile(onClose);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={deleteProfile}
      confirmText={t("deleteProfile.confirm")}
      title={t("deleteProfile.title")}
      text={t("deleteProfile.text")}
      cancelText={t("deleteProfile.cancel")}
      error={errorMessage}
      isLoading={isLoading}
      confirmButtonClassName={styles.confirmButtonProfile}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      maxWidth="700px"
    />
  );
};
