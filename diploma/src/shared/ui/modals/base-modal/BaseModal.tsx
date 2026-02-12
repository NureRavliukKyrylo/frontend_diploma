import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BaseModal.module.scss";
import { Close } from "@shared/assets/icons/actions";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  error?: string | null;
  maxWidth?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  error,
  maxWidth = "700px",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlayModal}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={styles.modalWrapper}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            style={{ maxWidth }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <img
              className={styles.closeButton}
              src={Close}
              alt="Close Button"
              onClick={onClose}
            />
            <div className={styles.childrenSection}>{children}</div>
            {error && <div className="errorMessage">{error}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
