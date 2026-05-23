import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ToggleDropdownButton.module.scss";
import { DownArrow } from "@shared/assets/icons/actions";
import { ListIcon } from "@shared/assets/icons/info";

type ToggleDropdownVariant = "filter" | "list" | "map";

interface ToggleDropdownButtonProps {
  children: React.ReactNode;
  variant?: ToggleDropdownVariant;
  onOpenChange?: (value: boolean) => void;
}

export const ToggleDropdownButton = ({
  children,
  variant = "filter",
  onOpenChange,
}: ToggleDropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.toggleInnerBlock}>
      <BaseButtonWrapper
        className={`${styles.toggleButton} ${isOpen ? styles.toggleButtonActive : ""}`}
        onClick={() => {
          const newValue = !isOpen;
          setIsOpen(newValue);
          onOpenChange?.(newValue);
        }}
      >
        <h1>{variant === "list" ? "List" : "Filter"}</h1>
        {variant === "list" ? (
          <motion.img
            src={ListIcon}
            alt="list"
            animate={{ scaleX: isOpen ? -1 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.listImage}
          />
        ) : (
          <motion.img
            src={DownArrow}
            alt="down arrow"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.arrowImage}
          />
        )}
      </BaseButtonWrapper>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={`${styles.toggleDropdown} ${styles[variant]}`}
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
