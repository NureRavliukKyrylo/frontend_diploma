import type { ReactNode } from "react";
import styles from "../styles/FillingInfoForm.module.scss";
import {
  PreviousStepperButton,
  SkipStepperButton,
} from "../../../buttons/auth";
import { NextStepperButton } from "../../../buttons/auth";
import { InfoSign } from "../../../assets/common";

interface FillingInfoFormProps {
  message: string;
  formTitle: string;
  formDescription: string;
  children: ReactNode;
}

export function FillingInfoForm({
  children,
  message,
  formTitle,
  formDescription,
}: FillingInfoFormProps) {
  return (
    <div className={styles.fillingInfoFormWrapper}>
      <h1>Welcome to ImpactFlow, User</h1>
      <p> Your local action, global change</p>
      <div className={styles.wrapperFillingInfoFormContainer}>
        <div className={styles.fillingInfoFormContainer}>
          <div className={styles.headerTextFillForm}>
            <h1>{formTitle}</h1>
            <p>{formDescription}</p>
          </div>
          {children}
          <div className={styles.buttonsFillForm}>
            <div className={styles.interactStepperButtons}>
              <PreviousStepperButton />
              <NextStepperButton />
              <SkipStepperButton />
            </div>
          </div>
        </div>
        <div className={styles.additionMessageFillForm}>
          <div className={styles.messageImgBlock}>
            <img src={InfoSign} alt="sign" />
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
