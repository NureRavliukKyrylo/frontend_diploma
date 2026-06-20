import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./LanguageMenu.module.scss";

export type LanguageMenuValue = "uk" | "en";

const languageOptions: Array<{
  value: LanguageMenuValue;
  label: string;
  flag: string;
}> = [
  {
    value: "uk",
    label: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
    flag: "\uD83C\uDDFA\uD83C\uDDE6",
  },
  {
    value: "en",
    label: "English",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
  },
];

interface LanguageMenuProps {
  className?: string;
  triggerClassName?: string;
  triggerIcon: ReactNode;
  value?: LanguageMenuValue;
  open?: boolean;
  tooltip?: string;
  onChange: (language: LanguageMenuValue) => void;
  onOpenChange?: (open: boolean) => void;
}

export const LanguageMenu = ({
  className,
  triggerClassName,
  triggerIcon,
  value,
  open,
  tooltip,
  onChange,
  onOpenChange,
}: LanguageMenuProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, className)}
      data-tooltip={tooltip}
      data-menu-open={isOpen ? "true" : undefined}
    >
      <button
        type="button"
        className={triggerClassName}
        aria-label="Language"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {triggerIcon}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            {languageOptions.map((language) => {
              const isSelected = value === language.value;

              return (
                <button
                  key={language.value}
                  type="button"
                  className={clsx(
                    styles.option,
                    isSelected && styles.optionSelected,
                  )}
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => onChange(language.value)}
                >
                  <span className={styles.optionMain}>
                    <span className={styles.flag}>{language.flag}</span>
                    <span>{language.label}</span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
