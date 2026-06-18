import { Footer, Header } from "@widgets/common";
import styles from "./indexLayout.module.scss";
import type { ReactNode } from "react";
import { NotificationToast } from "@entities/notification";
import { useLocaleStore } from "@shared/config/stores";

interface IndexLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export const LangSwitcher = () => {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const toggle = () => setLocale(locale === "en" ? "ua" : "en");

  return <button onClick={toggle}>{locale === "en" ? "UA" : "EN"}</button>;
};

export function IndexLayout({ children, showFooter = true }: IndexLayoutProps) {
  return (
    <div className={styles.pageHeaderWrapper}>
      <LangSwitcher />
      <main className={styles.layoutMain}>{children}</main>
      <NotificationToast />
    </div>
  );
}
