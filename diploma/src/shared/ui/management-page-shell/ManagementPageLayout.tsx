import type { ReactNode } from "react";
import styles from "./ManagementPageLayout.module.scss";

export const ManagementPageLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.page}>{children}</div>
);
