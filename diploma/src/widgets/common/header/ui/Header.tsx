import { useLogout } from "@features/auth";
import { LogOutImage } from "@shared/assets/images/actions";
import { ConfirmationModal } from "@shared/ui/modals";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { HeaderAccountMenu } from "./header-account-menu/HeaderAccountMenu";
import { HeaderActions } from "./header-actions/HeaderActions";
import { HeaderLanguageMenu } from "./header-language-menu/HeaderLanguageMenu";
import { HeaderMobileDrawer } from "./header-mobile-drawer/HeaderMobileDrawer";
import { HeaderNav } from "./header-nav/HeaderNav";
import { HeaderNotifications } from "./header-notifications/HeaderNotifications";
import { HeaderSearch } from "./header-search/HeaderSearch";
import styles from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import { useLocaleStore } from "@shared/config/stores";
import { useUserStore } from "@entities/user";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { handleLogout, isLoading, errorMessage } = useLogout(
    () => setIsLogoutModalOpen(false),
    false,
  );
  const { i18n, t } = useTranslation("common");
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const htmlOverflow = document.documentElement.style.overflowX;
    const bodyOverflow = document.body.style.overflowX;
    const applyOverflowGuard = () => {
      document.documentElement.style.overflowX = mediaQuery.matches
        ? "hidden"
        : htmlOverflow;
      document.body.style.overflowX = mediaQuery.matches
        ? "hidden"
        : bodyOverflow;
    };
    applyOverflowGuard();
    mediaQuery.addEventListener("change", applyOverflowGuard);
    return () => {
      mediaQuery.removeEventListener("change", applyOverflowGuard);
      document.documentElement.style.overflowX = htmlOverflow;
      document.body.style.overflowX = bodyOverflow;
    };
  }, []);

  return (
    <header
      className={clsx(
        styles.wrapper,
        "max-lg:!w-full max-lg:!max-w-[100vw] max-lg:!overflow-visible",
      )}
    >
      <div
        className={clsx(
          styles.main,
          "max-lg:!grid max-lg:!grid-cols-[1fr_auto_1fr] max-lg:!min-h-[72px] max-lg:!overflow-visible max-lg:!px-4 max-lg:!py-3 max-md:!min-h-[64px] max-md:!px-3 lg:max-xl:!grid lg:max-xl:!grid-cols-[1fr_auto_1fr] lg:max-xl:!items-center lg:max-xl:!overflow-visible lg:max-xl:!px-6 lg:max-xl:!py-5",
        )}
      >
        <div className={clsx(styles.mobileLeft, "!flex lg:!hidden")}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={t("header.openMenu")}
            aria-haspopup="dialog"
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className={styles.icon} strokeWidth={2} />
          </button>
        </div>
        <div
          className={clsx(
            styles.left,
            "!hidden lg:!flex lg:max-xl:!justify-self-start lg:max-xl:!gap-2",
          )}
        >
          <HeaderSearch value={search} onValueChange={setSearch} />
          {isAuthenticated && <HeaderNotifications />}
        </div>
        <div className={styles.center}>
          <h1 className={styles.logo}>IMPACTFLOW</h1>
        </div>
        <div
          className={clsx(
            styles.right,
            "!hidden lg:!flex lg:max-xl:!justify-self-end lg:max-xl:!gap-2",
          )}
        >
          <HeaderActions />
          <HeaderLanguageMenu
            value={locale ?? (i18n.language as "en" | "uk")}
            onChange={(locale) => setLocale(locale)}
          />
          {isAuthenticated && <HeaderAccountMenu />}
        </div>
        {isAuthenticated && (
          <div className={clsx(styles.mobileRight, "!flex lg:!hidden")}>
            <HeaderAccountMenu responsive />
          </div>
        )}
      </div>
      <HeaderNav />
      <HeaderMobileDrawer
        isOpen={isDrawerOpen}
        search={search}
        language={locale ?? (i18n.language as "en" | "uk")}
        onSearchChange={setSearch}
        onLanguageChange={(locale) => setLocale(locale)}
        onLogout={() => setIsLogoutModalOpen(true)}
        onClose={() => {
          setIsDrawerOpen(false);
          setSearch("");
        }}
      />
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title={t("header.logoutTitle")}
        text={t("header.logoutText")}
        confirmText={t("header.logout")}
        cancelText={t("actions.cancel")}
        onConfirm={() => handleLogout()}
        onCancel={() => setIsLogoutModalOpen(false)}
        isLoading={isLoading}
        image={LogOutImage}
        error={errorMessage}
      />
    </header>
  );
};
