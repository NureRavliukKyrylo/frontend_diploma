import { Footer, Header } from "@widgets/common";
import styles from "./indexLayout.module.scss";
import type { ReactNode } from "react";

interface IndexLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function IndexLayout({ children, showFooter = true }: IndexLayoutProps) {
  return (
    <div className={styles.pageHeaderWrapper}>
      <Header />
      <main className={styles.layoutMain}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
