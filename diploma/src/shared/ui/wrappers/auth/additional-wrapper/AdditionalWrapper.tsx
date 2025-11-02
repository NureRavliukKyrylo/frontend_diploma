import type { ReactNode } from "react";
import styles from "./AdditionalWrapper.module.scss";

interface AdditionalWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AdditionalWrapper({
  title,
  description,
  children,
}: AdditionalWrapperProps) {
  return (
    <div className={styles.additionalContainerWrapper}>
      <div className={styles.additionalContainer}>
        <div className={styles.headerAdditional}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
