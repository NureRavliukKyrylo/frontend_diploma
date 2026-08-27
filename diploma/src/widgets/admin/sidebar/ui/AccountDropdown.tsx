import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import styles from "./AdminSidebar.module.scss";
import { useTranslation } from "react-i18next";

interface AccountDropdownProps {
  fullName: string;
  roleLabel: string;
  initials: string;
  isOpen: boolean;
  isLoading: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export const AccountDropdown = ({
  fullName,
  roleLabel,
  initials,
  isOpen,
  isLoading,
  onToggle,
  onLogout,
}: AccountDropdownProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.accountBlock}>
      <button
        type="button"
        className={styles.accountTrigger}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className={styles.avatar}>{initials}</span>
        <span className={styles.accountText}>
          <span className={styles.accountName}>{fullName}</span>
          <span className={styles.accountRole}>{roleLabel}</span>
        </span>
        <ChevronDown className={styles.chevron} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.accountDropdown}
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <button
              type="button"
              className={styles.dropdownAction}
              role="menuitem"
              disabled={isLoading}
              onClick={onLogout}
            >
              <LogOut size={16} aria-hidden="true" />
              <span>{t("sidebar.logout")}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
