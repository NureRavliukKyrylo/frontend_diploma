import type { ReactNode } from "react";
import styles from "./EntityManagementPage.module.scss";

interface EntityPageShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  contextLabel?: string;
  backLabel: string;
  onBack: () => void;
  headerActions?: ReactNode;
  children: ReactNode;
}

export const EntityPageShell = ({
  eyebrow,
  title,
  subtitle,
  contextLabel,
  backLabel,
  onBack,
  headerActions,
  children,
}: EntityPageShellProps) => (
  <div className={styles.page}>
    <div className={styles.content}>
      <div className={styles.topRow}>
        <div>
          <div className={styles.headingMeta}>
            <div className={styles.eyebrow}>{eyebrow}</div>
            {contextLabel ? (
              <span className={styles.contextBadge}>{contextLabel}</span>
            ) : null}
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.topActions}>
          {headerActions}
          <button className={styles.backButton} type="button" onClick={onBack}>
            {backLabel}
          </button>
        </div>
      </div>

      {children}
    </div>
  </div>
);
