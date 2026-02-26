import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "../../buttons";
import { DownArrow } from "@shared/assets/icons/actions";
import styles from "./BaseDropDown.module.scss";

interface BaseDropDownProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

export const BaseDropDown = ({ label, children }: BaseDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.inner}>
      <BaseButtonWrapper
        className={`${styles.button} ${isOpen ? styles.buttonActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.labelBlock}>{label}</div>
        <motion.img
          src={DownArrow}
          alt="down arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </BaseButtonWrapper>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
