import { Footer, Header } from "@widgets/common";
import styles from "./indexLayout.module.scss";
import type { ReactNode } from "react";

interface IndexLayoutProps {
  children: ReactNode;
}

export function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <div className={styles.pageHeaderWrapper}>
      <Header />
      <main className={styles.layoutMain}>{children}</main>
      <Footer />
    </div>
  );
}
