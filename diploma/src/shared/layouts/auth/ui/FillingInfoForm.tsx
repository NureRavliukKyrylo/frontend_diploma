import type { ReactNode } from "react";
import styles from "../styles/FillingInfoForm.module.scss";
import { InfoSign } from "../../../assets/common";
import {
  NextStepperButton,
  PreviousStepperButton,
  SkipStepperButton,
} from "../../../buttons/auth";
import { motion, AnimatePresence } from "framer-motion";

interface FillingInfoFormProps {
  message: string;
  formTitle: string;
  formDescription: string;
  formId: string;
  children: ReactNode;
  activeStep: number;
  hideSkipButton?: boolean;
  totalSteps: number;
}

export function FillingInfoForm({
  children,
  message,
  formTitle,
  formDescription,
  formId,
  activeStep,
  hideSkipButton,
  totalSteps,
}: FillingInfoFormProps) {
  const isLastStep = activeStep === totalSteps - 1;
  return (
    <div className={styles.fillingInfoFormWrapper}>
      <h1>Welcome to ImpactFlow, User</h1>
      <p> Your local action, global change</p>
      <div className={styles.wrapperFillingInfoFormContainer}>
        <div className={styles.fillingInfoFormContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
            >
              <div className={styles.headerTextFillForm}>
                <h1>{formTitle}</h1>
                <p>{formDescription}</p>
              </div>
              {children}
            </motion.div>
          </AnimatePresence>
          <div className={styles.buttonsFillForm}>
            <PreviousStepperButton />
            <div className={styles.interactStepperButtons}>
              {!hideSkipButton && !isLastStep && <SkipStepperButton />}
              <NextStepperButton form={formId} />
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
