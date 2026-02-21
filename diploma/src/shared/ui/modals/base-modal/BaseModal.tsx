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
  onAnimationComplete?: () => void;
  showClosed?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  error,
  maxWidth = "700px",
  onAnimationComplete,
  showClosed = true,
}) => {
  const mouseDownTarget = React.useRef<EventTarget | null>(null);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlayModal}
          onMouseDown={(e) => {
            mouseDownTarget.current = e.target;
          }}
          onClick={(e) => {
            if (mouseDownTarget.current === e.currentTarget) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={styles.modalWrapper}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 1, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1, opacity: 0, y: 20 }}
            style={{ maxWidth }}
            onAnimationComplete={onAnimationComplete}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            {showClosed && (
              <div className={styles.closeButtonBlock}>
                <img
                  className={styles.closeButton}
                  src={Close}
                  alt="Close Button"
                  onClick={onClose}
                />
              </div>
            )}
            <div className={styles.childrenSection}>{children}</div>
            {error && <div className="errorMessage">{error}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
