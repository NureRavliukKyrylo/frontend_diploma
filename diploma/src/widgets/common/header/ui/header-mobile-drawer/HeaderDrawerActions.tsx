import { notificationQuery } from "@entities/notification";
import { useUserStore } from "@entities/user";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import {
  Bell,
  Bookmark,
  Building2,
  LogOut,
  MessageSquareText,
} from "lucide-react";
import {
  getLanguageDisplay,
  languageOptions,
  type HeaderLanguage,
} from "../../lib/header";
import styles from "./HeaderMobileDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface HeaderDrawerActionsProps {
  language: HeaderLanguage;
  onLanguageChange: (language: HeaderLanguage) => void;
  onLogout: () => void;
  onNavigate: () => void;
}

export const HeaderDrawerActions = ({
  language,
  onLanguageChange,
  onLogout,
  onNavigate,
}: HeaderDrawerActionsProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const { isAuthenticated } = useUserStore();
  const { data: unreadCountData } = useQuery({
    ...notificationQuery.unreadCount(),
    enabled: isAuthenticated === true,
  });
  const unreadCount = unreadCountData?.count ?? 0;

  const goTo = (to: string, search?: Record<string, unknown>) => {
    onNavigate();
    void navigate({ to: to as never, search: search as never });
  };

  return (
    <div className={styles.actionsGroup}>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionItem}
          onClick={() => goTo("/notifications")}
        >
          <Bell aria-hidden="true" strokeWidth={1.9} />
          <span>{t("header.notifications")}</span>
          {unreadCount > 0 && (
            <span className={styles.notificationBadge}>{unreadCount}</span>
          )}
        </button>
        <button
          type="button"
          className={styles.actionItem}
          onClick={() => goTo("/chat")}
        >
          <MessageSquareText aria-hidden="true" strokeWidth={1.9} />
          <span>{t("header.messages")}</span>
        </button>
        <button
          type="button"
          className={styles.actionItem}
          onClick={() => goTo("/organizations/my")}
        >
          <Building2 aria-hidden="true" strokeWidth={1.9} />
          <span>{t("header.myOrganizations")}</span>
        </button>
        <button
          type="button"
          className={styles.actionItem}
          onClick={() => goTo("/activities/my")}
        >
          <Bookmark aria-hidden="true" strokeWidth={1.9} />
          <span>{t("header.bookmark")}</span>
        </button>
        <div className={styles.languageSwitcher}>
          {languageOptions.map((option) => {
            const isSelected = language === option.value;
            const display = getLanguageDisplay(option.value);
            return (
              <button
                key={option.value}
                type="button"
                className={clsx(
                  styles.languageButton,
                  isSelected && styles.languageButtonSelected,
                )}
                aria-pressed={isSelected}
                onClick={() => onLanguageChange(option.value)}
              >
                <span>{display.flag}</span>
                <span>
                  {option.value === "uk" ? "\u0423\u043A\u0440" : "Eng"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.divider} />
      <button
        type="button"
        className={clsx(styles.actionItem, styles.logoutButton)}
        onClick={() => {
          onNavigate();
          onLogout();
        }}
      >
        <LogOut aria-hidden="true" strokeWidth={1.9} />
        <span>{t("header.logout")}</span>
      </button>
    </div>
  );
};
