import type { ReactNode } from "react";
import styles from "../styles/FillingInfoForm.module.scss";
import { PreviousStepperButton } from "../../../buttons/auth";
import { NextStepperButton } from "../../../buttons/auth";

interface FillingInfoFormProps {
  message: string;
  children: ReactNode;
}

export function FillingInfoForm({ children, message }: FillingInfoFormProps) {
  return (
    <div className={styles.fillingInfoFormWrapper}>
      <h1>Welcome to ImpactFlow, User</h1>
      <p> Your local action, global change</p>
      <div className={styles.fillingInfoFormContainer}>
        {children}
        <div className={styles.buttonsFillForm}>
          <div className={styles.interactStepperButtons}>
            <PreviousStepperButton />
            <NextStepperButton />
          </div>
        </div>
      </div>
      <div className={styles.additionMessageFillForm}>
        <p>{message}</p>
      </div>
    </div>
  );
}
