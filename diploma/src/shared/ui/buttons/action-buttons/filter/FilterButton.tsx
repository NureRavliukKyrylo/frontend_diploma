import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "../../base-buttons/base-wrapper/BaseButtonWrapper";
import styles from "./FilterButton.module.scss";
import { DownArrow } from "@shared/assets/icons/actions";

interface FilterButtonProps {
  children: React.ReactNode;
  onOpenChange?: (value: boolean) => void;
}

export const FilterButton = ({ children, onOpenChange }: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filtersInnerBlock}>
      <BaseButtonWrapper
        className={`${styles.filterButton} ${isOpen ? styles.filterButtonActive : ""}`}
        onClick={() => {
          const newValue = !isOpen;
          setIsOpen(newValue);
          onOpenChange?.(newValue);
        }}
      >
        <h1>Filter</h1>
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
            className={styles.filterDropdown}
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
