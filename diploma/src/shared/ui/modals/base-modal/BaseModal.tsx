import React from "react";
import styles from "./BaseModal.module.scss";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  error?: string | null;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlayModal} onClick={onClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        {children}

        {error && <div className={styles.errorInput}>{error}</div>}
      </div>
    </div>
  );
};
