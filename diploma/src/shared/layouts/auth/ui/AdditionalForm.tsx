import type { ReactNode } from "react";
import styles from "../styles/AdditionalForm.module.scss";

interface AdditionalFormProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AdditionalForm({
  title,
  description,
  children,
}: AdditionalFormProps) {
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
