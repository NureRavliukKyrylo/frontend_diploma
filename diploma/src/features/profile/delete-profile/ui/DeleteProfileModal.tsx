import { ConfirmationModal } from "@shared/ui/modals";
import { useDeleteProfile } from "../model/useDeleteProfile";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeleteProfileModal.module.scss";

interface DeleteProfileModal {
  isOpen: boolean;
  onClose: () => void;
}
export const DeleteProfileModal = ({ isOpen, onClose }: DeleteProfileModal) => {
  const { deleteProfile, isLoading, errorMessage } = useDeleteProfile(onClose);
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={deleteProfile}
      confirmText="Delete Profile"
      title="Delete Your Profile"
      text="Are you sure you want to delete your profile? 
          This action cannot be undone. 
          All your data, settings, and content will be permanently removed."
      cancelText="Cancel"
      error={errorMessage}
      isLoading={isLoading}
      confirmButtonClassName={styles.confirmButtonProfile}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      maxWidth="700px"
    ></ConfirmationModal>
  );
};
