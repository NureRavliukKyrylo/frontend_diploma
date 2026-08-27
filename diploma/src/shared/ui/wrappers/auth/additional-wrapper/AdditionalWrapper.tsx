import type { ReactNode } from "react";
import styles from "./AdditionalWrapper.module.scss";
import { AuthCardDecoration } from "../card-decoration";

interface AdditionalWrapperProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AdditionalWrapper({
  eyebrow,
  title,
  description,
  children,
}: AdditionalWrapperProps) {
  return (
    <div className={styles.additionalContainerWrapper}>
      <div className={styles.additionalContainer}>
        <AuthCardDecoration />
        <div className={styles.cardContent}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>{eyebrow}</span>
          </div>
          <div className={styles.headerAdditional}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
