import { useLocaleStore } from "@shared/config/stores";
import { LanguageMenu } from "@shared/ui";
import { Link } from "@tanstack/react-router";
import { Bell, Globe, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./AdminSidebar.module.scss";

interface SidebarActionRowProps {
  searchLabel: string;
  notificationLabel: string;
  notificationTooltip: string;
}

export const SidebarActionRow = ({
  searchLabel,
  notificationLabel,
  notificationTooltip,
}: SidebarActionRowProps) => {
  const { i18n } = useTranslation();
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);

  return (
    <div className={styles.actionRow}>
      <button type="button" className={styles.searchButton}>
        <span className={styles.searchLeft}>
          <Search size={16} aria-hidden="true" />
          <span>{searchLabel}</span>
        </span>
        <span className={styles.shortcut}>вЊK</span>
      </button>
      <Link
        to="/admin/notifications"
        className={styles.notificationButton}
        aria-label="Notifications"
      >
        <Bell size={18} aria-hidden="true" />
        <span className={styles.notificationBadge}>{notificationLabel}</span>
        <span className={styles.notificationTooltip}>{notificationTooltip}</span>
      </Link>
      <LanguageMenu
        className={styles.languageMenu}
        triggerClassName={styles.languageTrigger}
        triggerIcon={<Globe size={18} aria-hidden="true" />}
        tooltip="Language"
        value={locale ?? (i18n.language as "en" | "uk")}
        onChange={(nextLocale) => setLocale(nextLocale)}
      />
    </div>
  );
};
