import React from "react";
import { BaseModal } from "../base-modal/BaseModal";
import styles from "./ConfirmationModal.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  imageClassName?: string;
  maxWidth?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  children?: React.ReactNode;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  text,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  isLoading = false,
  error,
  image,
  imageClassName,
  maxWidth = "650px",
  confirmButtonClassName,
  cancelButtonClassName,
  children,
}) => {
  const { t } = useTranslation("common");

  return (
    <BaseModal isOpen={isOpen} onClose={onCancel} maxWidth={maxWidth}>
      <div className={styles.modalConfirmationWrapper}>
        {image && (
          <img
            className={`${styles.modalConfirmationImage} ${imageClassName ?? ""}`}
            src={image}
            alt={t("accessibility.modalImage")}
          />
        )}
        <div className={styles.modalConfirmationTitle}>
          <h2>{title}</h2>
        </div>

        <div className={styles.modalConfirmationDescription}>
          <p>{text}</p>
        </div>

        {children}

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
              className={`${styles.confirmButtonModal} ${confirmButtonClassName ?? ""}`}
            >
              {confirmText ?? t("confirmation.yes")}
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
              className={`${styles.cancelButtonModal} ${cancelButtonClassName ?? ""}`}
            >
              {cancelText ?? t("confirmation.no")}
            </BaseButtonWrapper>
          </motion.div>
        </div>
        {error && <div className="errorMessage">{error}</div>}
      </div>
    </BaseModal>
  );
};
