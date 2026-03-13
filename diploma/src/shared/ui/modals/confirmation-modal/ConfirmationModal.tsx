import React from "react";
import { BaseModal } from "../base-modal/BaseModal";
import styles from "./ConfirmationModal.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  error?: string | null;
  image?: string;
  maxWidth?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  text,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  isLoading = false,
  error,
  image,
  maxWidth = "650px",
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onCancel}
      error={error}
      maxWidth={maxWidth}
    >
      <div className={styles.modalConfirmationWrapper}>
        {image && (
          <img
            className={styles.modalConfirmationImage}
            src={image}
            alt="modal image"
          />
        )}
        <div className={styles.modalConfirmationTitle}>
          <h2>{title}</h2>
        </div>

        <div className={styles.modalConfirmationDescription}>
          <p>{text}</p>
        </div>

        <div className={styles.actionsConfirmationModal}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={styles.wrapperConfirmButtonModal}
          >
            <BaseButtonWrapper
              onClick={onConfirm}
              loading={isLoading}
              className={styles.confirmButtonModal}
            >
              {confirmText}
            </BaseButtonWrapper>
          </motion.div>

          <motion.div
            whileHover={{ x: [0, -3, 3, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.wrapperConfirmButtonModal}
          >
            <BaseButtonWrapper
              onClick={onCancel}
              className={styles.cancelButtonModal}
            >
              {cancelText}
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseModal>
  );
};
