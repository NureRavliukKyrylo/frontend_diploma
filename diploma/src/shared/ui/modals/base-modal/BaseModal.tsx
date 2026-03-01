import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BaseModal.module.scss";
import { Close } from "@shared/assets/icons/actions";
import {
  modalAnimations,
  type ModalAnimationType,
} from "@shared/assets/animations";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  error?: string | null;
  maxWidth?: string;
  showClosed?: boolean;
  animation?: ModalAnimationType;
}

import { createPortal } from "react-dom";

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  error,
  maxWidth = "700px",
  showClosed = true,
  animation = "default",
}) => {
  const mouseDownTarget = React.useRef<EventTarget | null>(null);
  const { overlay, modal, transition } = modalAnimations[animation];

  return createPortal(
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
          variants={overlay}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={styles.modalWrapper}
            onClick={(e) => e.stopPropagation()}
            variants={modal}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ maxWidth }}
            transition={transition}
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
    </AnimatePresence>,
    document.body,
  );
};
