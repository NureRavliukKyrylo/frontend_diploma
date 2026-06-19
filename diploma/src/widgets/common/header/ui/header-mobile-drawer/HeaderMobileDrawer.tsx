import { Link, useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { headerLinks } from "../../config/headerLinks";
import {
  isHeaderLinkActive,
  type HeaderLanguage,
} from "../../lib/header";
import { HeaderSearch } from "../header-search/HeaderSearch";
import { HeaderDrawerActions } from "./HeaderDrawerActions";
import styles from "./HeaderMobileDrawer.module.scss";

interface HeaderMobileDrawerProps {
  isOpen: boolean;
  search: string;
  language: HeaderLanguage;
  onSearchChange: (value: string) => void;
  onLanguageChange: (language: HeaderLanguage) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const HeaderMobileDrawer = ({
  isOpen,
  search,
  language,
  onSearchChange,
  onLanguageChange,
  onLogout,
  onClose,
}: HeaderMobileDrawerProps) => {
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={clsx(styles.backdrop, "lg:!hidden")}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={onClose}
          />
          <motion.aside
            className={clsx(
              styles.panel,
              "lg:!hidden md:max-lg:!w-[280px] max-md:!w-[100vw] max-md:!max-w-[100vw]",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.header}>
              <span className={styles.logo}>IMPACTFLOW</span>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close menu"
                onClick={onClose}
              >
                <X className={styles.icon} strokeWidth={2} />
              </button>
            </div>
            <HeaderSearch
              variant="drawer"
              value={search}
              onValueChange={onSearchChange}
              onNavigate={onClose}
            />
            <div className={styles.divider} />
            <nav className={styles.nav} aria-label="Mobile primary">
              {headerLinks.map(({ title, href }) => (
                <Link
                  key={href}
                  to={href}
                  className={styles.navLink}
                  data-active={
                    isHeaderLinkActive(location.pathname, href)
                      ? "true"
                      : undefined
                  }
                  onClick={onClose}
                >
                  <span className={styles.navLabel}>{title}</span>
                </Link>
              ))}
            </nav>
            <div className={styles.divider} />
            <HeaderDrawerActions
              language={language}
              onLanguageChange={onLanguageChange}
              onLogout={onLogout}
              onNavigate={onClose}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
