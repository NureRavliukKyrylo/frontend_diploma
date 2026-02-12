import React, { useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useLogout } from "../model/useLogout";
import { ConfirmationModal } from "@shared/ui/modals/confirmation-modal/ConfirmationModal";
import styles from "./LogoutButton.module.scss";

import { Power } from "@shared/assets/icons/actions";
import { LogOutImage } from "@shared/assets/images/actions";

export const LogoutButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const closeModal = () => setIsModalOpen(false);

  const { handleLogout, isLoading, errorMessage } = useLogout(() => {
    closeModal();
  });

  const confirmLogout = () => {
    handleLogout();
  };

  return (
    <>
      <BaseButtonWrapper
        className={styles.logoutButton}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={Power} alt="Power" className={styles.iconLogout} />
      </BaseButtonWrapper>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Are you logging out?"
        text="Do you want to log out now? You’ll be able to sign in again whenever you need."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={closeModal}
        isLoading={isLoading}
        image={LogOutImage}
        error={errorMessage}
      />
    </>
  );
};
