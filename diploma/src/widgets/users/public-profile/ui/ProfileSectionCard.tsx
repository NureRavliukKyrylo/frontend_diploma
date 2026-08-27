import type { ReactNode } from "react";
import styles from "./ProfileSectionCard.module.scss";

interface ProfileSectionCardProps {
  title: string;
  meta?: string;
  children: ReactNode;
}

export const ProfileSectionCard = ({
  title,
  meta,
  children,
}: ProfileSectionCardProps) => (
  <section className={styles.card}>
    <div className={styles.deco} />
    <div className={styles.header}>
      <h2>{title}</h2>
      <span className={styles.line} />
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
    <div className={styles.content}>{children}</div>
  </section>
);
