import React from "react";
import { BaseModal } from "../base-modal/BaseModal";
import styles from "./ConfirmationModal.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";

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
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onCancel} error={error}>
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
          <BaseButtonWrapper
            className={styles.confirmButtonModal}
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </BaseButtonWrapper>

          <BaseButtonWrapper
            className={styles.cancelButtonModal}
            onClick={onCancel}
          >
            {cancelText}
          </BaseButtonWrapper>
        </div>
      </div>
    </BaseModal>
  );
};
