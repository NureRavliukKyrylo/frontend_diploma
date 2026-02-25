import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "../../base-buttons/base-wrapper/BaseButtonWrapper";
import styles from "./FilterButton.module.scss";
import { DownArrow } from "@shared/assets/icons/actions";

interface FilterButtonProps {
  children: React.ReactNode;
}

export const FilterButton = ({ children }: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapperFilter}>
      <div
        className={`${styles.filtersInnerBlock} ${isOpen ? styles.active : ""}`}
      >
        <BaseButtonWrapper
          className={`${styles.filterButton} ${isOpen ? styles.filterButtonActive : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
