import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./DeleteProfileButton.module.scss";
import { useState } from "react";
import { DeleteProfileModal } from "./DeleteProfileModal";

export const DeleteProfileButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <BaseButtonWrapper
        className={styles.deleteAccountButton}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        DELETE PROFILE
      </BaseButtonWrapper>
      <DeleteProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
