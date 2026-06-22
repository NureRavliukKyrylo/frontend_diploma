import { Avatar } from "@shared/ui";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { HeaderTimeBank } from "../header-time-bank/HeaderTimeBank";
import styles from "./HeaderAccountMenu.module.scss";

interface HeaderAccountDropdownProps {
  isOpen: boolean;
  responsive: boolean;
  avatarSrc?: string;
  fullName: string;
  email: string;
  availableMinutes?: number | null;
  isLogoutLoading: boolean;
  onProfileClick: () => void;
  onLogoutClick: () => void;
}

export const HeaderAccountDropdown = ({
  isOpen,
  responsive,
  avatarSrc,
  fullName,
  email,
  availableMinutes,
  isLogoutLoading,
  onProfileClick,
  onLogoutClick,
}: HeaderAccountDropdownProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={clsx(
          styles.dropdown,
          responsive
            ? "max-lg:!right-0 max-lg:!max-w-[calc(100vw-24px)]"
            : "lg:max-xl:!right-0 lg:max-xl:!max-w-[calc(100vw-48px)]",
        )}
        role="menu"
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <button
          type="button"
          className={styles.userInfo}
          role="menuitem"
          onClick={onProfileClick}
        >
          <Avatar
            src={avatarSrc}
            fallback={fullName}
            shape="circle"
            className={styles.dropdownImage}
          />
          <div className={styles.userText}>
            <span>{fullName}</span>
            <span>{email}</span>
          </div>
        </button>
        <HeaderTimeBank availableMinutes={availableMinutes} />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionButton}
            role="menuitem"
            disabled={isLogoutLoading}
            onClick={onLogoutClick}
          >
            <LogOut aria-hidden="true" strokeWidth={1.9} />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
