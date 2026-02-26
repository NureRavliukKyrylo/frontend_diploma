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
    <div className={styles.wrapper}>
      <div className={`${styles.inner} ${isOpen ? styles.active : ""}`}>
        <BaseButtonWrapper
          className={`${styles.button} ${isOpen ? styles.buttonActive : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {label}
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
