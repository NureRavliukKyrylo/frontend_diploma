import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe2 } from "lucide-react";
import clsx from "clsx";
import styles from "./GuestTopBar.module.scss";

const topLinks: Array<{ label: string; href: string }> = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Settings", href: "/cookies" },
];

const languageOptions = [
  { code: "uk", label: "Ukrainian" },
  { code: "en", label: "English" },
] as const;

const isActiveLink = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export const GuestTopBar = () => {
  const pathname = useRouterState({
    select: state => state.location.pathname,
  });
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLanguageOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
      }
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
        {topLinks.map(link => (
          <Link
            key={link.href}
            to={link.href}
            className={clsx(styles.topLink, {
              [styles.active]: isActiveLink(pathname, link.href),
            })}
          >
            {link.label}
          </Link>
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
          onClick={() => setIsLanguageOpen(isOpen => !isOpen)}
        >
          <Globe2 size={14} aria-hidden="true" />
          <span>{selectedLanguage === "uk" ? "UKR" : "EN"}</span>
          <ChevronDown size={13} aria-hidden="true" />
        </motion.button>

        <AnimatePresence>
          {isLanguageOpen && (
            <motion.div
              className={styles.languageDropdown}
              role="menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {languageOptions.map(option => {
                const isSelected = selectedLanguage === option.code;

                return (
                  <button
                    key={option.code}
                    type="button"
                    className={clsx(styles.languageOption, {
                      [styles.selectedLanguageOption]: isSelected,
                    })}
                    role="menuitem"
                    onClick={() => {
                      setSelectedLanguage(option.code);
                      setIsLanguageOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
