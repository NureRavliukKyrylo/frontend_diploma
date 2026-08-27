import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconSearch, IconX } from "@tabler/icons-react";
import styles from "./FaqSearch.module.scss";

interface FaqSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const FaqSearch = ({ value, onChange }: FaqSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <motion.div
      className={styles.searchWrap}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
    >
      <label className={styles.searchInner}>
        <IconSearch className={styles.searchIcon} aria-hidden="true" />
        <input
          ref={inputRef}
          className={styles.searchInput}
          type="search"
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder="Search questions, topics, and answers..."
          aria-label="Search frequently asked questions"
        />
        {value && (
          <button
            className={styles.clearBtn}
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            <IconX />
          </button>
        )}
      </label>
    </motion.div>
  );
};
