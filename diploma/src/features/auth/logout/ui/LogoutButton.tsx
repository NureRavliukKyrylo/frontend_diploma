import React, { useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useLogout } from "../model/useLogout";
import { ConfirmationModal } from "@shared/ui/modals/confirmation-modal/ConfirmationModal";
import styles from "./LogoutButton.module.scss";
import { useErrorStore } from "@shared/config";
import { Power } from "@shared/assets/icons/actions";

export const LogoutButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const serverError = useErrorStore((state) => state.errors["logoutError"]);

  const closeModal = () => setIsModalOpen(false);

  const { handleLogout, isLoading } = useLogout(() => {
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
        title="Confirm logout"
        text="Are you sure you want to log out of the system?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={closeModal}
        isLoading={isLoading}
        error={serverError}
      />
    </>
  );
};
