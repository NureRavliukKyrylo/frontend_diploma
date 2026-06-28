import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "../../buttons";
import { DownArrow } from "@shared/assets/icons/actions";
import styles from "./BaseDropDown.module.scss";

interface BaseDropDownProps {
  label: ReactNode;
  children: ReactNode;
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
  const innerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const updateDropdownPosition = useCallback(() => {
    const rect = innerRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setDropdownPosition({
      top: rect.bottom,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition, true);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [isOpen, updateDropdownPosition]);

  return (
    <div ref={innerRef} className={`${styles.inner} ${className ?? ""}`}>
      <BaseButtonWrapper
        type="button"
        className={`${styles.button} ${isOpen ? styles.buttonActive : ""} ${buttonClassName ?? ""}`}
        onClick={() => {
          updateDropdownPosition();
          setIsOpen((prev) => !prev);
        }}
      >
        <div className={styles.labelBlock}>{label}</div>
        <motion.img
          src={DownArrow}
          alt="down arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </BaseButtonWrapper>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                layout
                className={`${styles.dropdown} ${dropdownClassName ?? ""}`}
                style={{
                  position: "fixed",
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                  zIndex: 12000,
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0.2 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
