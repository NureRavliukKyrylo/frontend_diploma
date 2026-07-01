import { Link } from "@tanstack/react-router";
import {
  adminNavItems,
  moderationNavItem,
  type AdminNavBadge,
  type AdminNavItem,
} from "../config/adminSidebarNav";
import { isNavItemActive } from "../lib/sidebarNavState";
import styles from "./AdminSidebar.module.scss";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

interface SidebarNavProps {
  pathname: string;
  badgeLabels: Record<AdminNavBadge["key"], string>;
}

const renderNavContent = (
  item: AdminNavItem,
  badgeLabels: Record<AdminNavBadge["key"], string>,
  t: TFunction,
) => {
  const Icon = item.icon;

  return (
    <>
      <Icon className={styles.navIcon} aria-hidden="true" />
      <span className={styles.navLabel}>{t(item.title)}</span>
      <span className={styles.navTrail}>
        {item.badge ? (
          <span
            className={`${styles.badge} ${
              item.badge.tone === "accent" ? styles.badgeAccent : ""
            }`}
          >
            {badgeLabels[item.badge.key]}
          </span>
        ) : null}
      </span>
    </>
  );
};

export const SidebarNav = ({ pathname, badgeLabels }: SidebarNavProps) => {
  const { t } = useTranslation("admin");
  const ModerationIcon = moderationNavItem.icon;

  return (
    <>
      <div className={styles.sectionLabel}>{t("sidebar.menu")}</div>
      <nav className={styles.navList} aria-label={t("sidebar.navigation")}>
        {adminNavItems.map((item) => {
          const isActive = item.href
            ? isNavItemActive(pathname, item.href)
            : false;
          const itemKey = item.href ?? item.title;

          if (!item.href) {
            return null;
          }

          return (
            <Link
              key={itemKey}
              to={item.href}
              className={styles.navItem}
              data-active={isActive ? "true" : undefined}
            >
              {renderNavContent(item, badgeLabels, t)}
            </Link>
          );
        })}
      </nav>

      <div className={styles.divider} />
      <div className={styles.moderationItem} aria-disabled="true">
        <ModerationIcon className={styles.navIcon} aria-hidden="true" />
        <span>{t(moderationNavItem.title)}</span>
      </div>
    </>
  );
};
