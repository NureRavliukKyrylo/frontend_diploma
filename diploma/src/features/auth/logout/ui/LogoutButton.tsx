import React, { useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useLogout } from "../model/useLogout";
import { ConfirmationModal } from "@shared/ui/modals/confirmation-modal/ConfirmationModal";
import styles from "./LogoutButton.module.scss";
import { Power } from "@shared/assets/icons/actions";
import { LogOutImage } from "@shared/assets/images/actions";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LogoutButton: React.FC = () => {
  const { t } = useTranslation("auth");
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
        <motion.img
          layout
          src={Power}
          alt="logout"
          className={styles.iconLogout}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: [0, -15, 15, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
        />
      </BaseButtonWrapper>

      <ConfirmationModal
        isOpen={isModalOpen}
        title={t("logout.modal.title")}
        text={t("logout.modal.text")}
        confirmText={t("logout.modal.confirmText")}
        cancelText={t("logout.modal.cancelText")}
        onConfirm={confirmLogout}
        onCancel={closeModal}
        isLoading={isLoading}
        image={LogOutImage}
        error={errorMessage}
      />
    </>
  );
};
