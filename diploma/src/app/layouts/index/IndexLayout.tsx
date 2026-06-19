import { Footer, Header } from "@widgets/common";
import styles from "./indexLayout.module.scss";
import type { ReactNode } from "react";
import { NotificationToast } from "@entities/notification";
import { useLocaleStore } from "@shared/config/stores";

interface IndexLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  noFooterVariant?: "content" | "fullscreen";
}

export const LangSwitcher = () => {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const toggle = () => setLocale(locale === "en" ? "ua" : "en");

  return (
    <button className={styles.langSwitcher} onClick={toggle}>
      {locale === "en" ? "UA" : "EN"}
    </button>
  );
};

export function IndexLayout({
  children,
  showHeader = true,
  showFooter = true,
  noFooterVariant = "content",
}: IndexLayoutProps) {
  const isChromeless = !showHeader && !showFooter;
  const isFooterless = showHeader && !showFooter;
  const noFooterMode = isFooterless ? noFooterVariant : undefined;

  return (
    <div className={styles.pageHeaderWrapper} data-no-footer-mode={noFooterMode}>
      <LangSwitcher />
      {showHeader ? <Header /> : null}
      <main
        className={styles.layoutMain}
        data-chromeless={isChromeless}
        data-no-footer={isFooterless}
        data-no-footer-mode={noFooterMode}
      >
        {children}
      </main>
      {showFooter ? <Footer /> : null}
      <NotificationToast />
    </div>
  );
}
