import { Footer, Header } from "@widgets/common";
import styles from "./indexLayout.module.scss";
import type { ReactNode } from "react";
import { NotificationToast } from "@entities/notification";

interface IndexLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}
import { useRouter, useSearch } from "@tanstack/react-router";

export const LangSwitcher = () => {
  const { locale } = useSearch({ strict: false });
  const router = useRouter();

  const toggle = () => {
    router.navigate({
      to: ".",
      search: { locale: locale === "en" ? "ua" : "en" } as any,
      replace: true,
    });
  };

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
