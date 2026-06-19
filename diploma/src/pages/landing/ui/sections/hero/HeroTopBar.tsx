import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe2 } from "lucide-react";
import { languageOptions, topLinks } from "../../../config/landingContent";
import styles from "./HeroTopBar.module.scss";

export const HeroTopBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLanguageOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLanguageOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLanguageOpen]);

  return (
    <div className={styles.topBar}>
      <nav className={styles.topLinks} aria-label="Guest links">
        {topLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            className={index === 0 ? styles.firstTopLink : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.languageMenu} ref={languageRef}>
        <motion.button
          type="button"
          className={styles.languageButton}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          aria-haspopup="menu"
          aria-expanded={isLanguageOpen}
          onClick={() => setIsLanguageOpen((isOpen) => !isOpen)}
        >
          <Globe2 size={14} aria-hidden="true" />
          <span>{selectedLanguage === "uk" ? "Р Р€Р С™Р В " : "EN"}</span>
          <ChevronDown size={13} aria-hidden="true" />
        </motion.button>
        <AnimatePresence>
          {isLanguageOpen ? (
            <motion.div
              className={styles.languageDropdown}
              role="menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {languageOptions.map((option) => {
                const isSelected = selectedLanguage === option.code;

                return (
                  <button
                    key={option.code}
                    type="button"
                    className={
                      isSelected
                        ? `${styles.languageOption} ${styles.selectedLanguageOption}`
                        : styles.languageOption
                    }
                    role="menuitem"
                    onClick={() => {
                      setSelectedLanguage(option.code);
                      setIsLanguageOpen(false);
                    }}
                  >
                    <span aria-hidden="true">{option.flag}</span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
