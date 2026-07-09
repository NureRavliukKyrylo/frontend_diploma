import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "../../buttons";
import { DownArrow } from "@shared/assets/icons/actions";
import styles from "./BaseDropDown.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  const innerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    bottom: 0,
    maxHeight: 360,
    placement: "bottom" as "top" | "bottom",
  });
  const updateDropdownPosition = useCallback(() => {
    const rect = innerRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const viewportHeight = window.innerHeight;
    const gap = 8;
    const availableBelow = viewportHeight - rect.bottom - gap;
    const availableAbove = rect.top - gap;
    const shouldOpenUp = availableBelow < 260 && availableAbove > availableBelow;
    const availableSpace = shouldOpenUp ? availableAbove : availableBelow;

    setDropdownPosition({
      top: shouldOpenUp ? 0 : rect.bottom,
      left: rect.left,
      width: rect.width,
      bottom: shouldOpenUp ? viewportHeight - rect.top : 0,
      maxHeight: Math.max(160, Math.min(360, availableSpace)),
      placement: shouldOpenUp ? "top" : "bottom",
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

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        innerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={innerRef} className={`${styles.inner} ${className ?? ""}`}>
      <BaseButtonWrapper
        type="button"
        className={`${styles.button} ${isOpen ? styles.buttonActive : ""} ${
          isOpen && dropdownPosition.placement === "top"
            ? styles.buttonActiveTop
            : ""
        } ${buttonClassName ?? ""}`}
        onClick={() => {
          updateDropdownPosition();
          setIsOpen((prev) => !prev);
        }}
      >
        <div className={styles.labelBlock}>{label}</div>
        <motion.img
          src={DownArrow}
          alt={t("accessibility.downArrow")}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </BaseButtonWrapper>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                className={`${styles.dropdown} ${
                  dropdownPosition.placement === "top"
                    ? styles.dropdownTop
                    : styles.dropdownBottom
                } ${dropdownClassName ?? ""}`}
                onClick={() => setIsOpen(false)}
                style={{
                  position: "fixed",
                  top:
                    dropdownPosition.placement === "bottom"
                      ? dropdownPosition.top
                      : "auto",
                  bottom:
                    dropdownPosition.placement === "top"
                      ? dropdownPosition.bottom
                      : "auto",
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                  maxHeight: dropdownPosition.maxHeight,
                  overflowY: "auto",
                  zIndex: 12000,
                  transformOrigin:
                    dropdownPosition.placement === "top"
                      ? "bottom center"
                      : "top center",
                }}
                initial={{
                  opacity: 0,
                  y: dropdownPosition.placement === "top" ? 8 : -8,
                  scaleY: 0.98,
                }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{
                  opacity: 0,
                  y: dropdownPosition.placement === "top" ? 8 : -8,
                  scaleY: 0.98,
                }}
                transition={{ duration: 0.16, ease: "easeOut" }}
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
