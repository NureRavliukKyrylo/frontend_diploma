import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "../../buttons";
import { DownArrow } from "@shared/assets/icons/actions";
import styles from "./BaseDropDown.module.scss";

interface BaseDropDownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
}

export const BaseDropDown = ({
  label,
  children,
  buttonClassName,
  className,
  dropdownClassName,
}: BaseDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.inner} ${className ?? ""}`}>
      <BaseButtonWrapper
        type="button"
        className={`${styles.button} ${isOpen ? styles.buttonActive : ""} ${buttonClassName ?? ""}`}
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
            layout
            className={`${styles.dropdown} ${dropdownClassName ?? ""}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0.2 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
