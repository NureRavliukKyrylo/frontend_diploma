import type { ReactNode } from "react";
import styles from "./FillingInfoWrapper.module.scss";
import { InfoSign } from "@shared/assets/icons/info";
import {
  NextStepperButton,
  PreviousStepperButton,
  SkipStepperButton,
} from "@shared/ui/buttons";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@entities/user";

interface FillingInfoWrapperProps {
  message: string;
  formTitle: string;
  formDescription: string;
  formId: string;
  children: ReactNode;
  activeStep: number;
  hideSkipButton?: boolean;
  hidePrevButton?: boolean;
  totalSteps: number;
}

export function FillingInfoWrapper({
  children,
  message,
  formTitle,
  formDescription,
  formId,
  activeStep,
  hideSkipButton,
  hidePrevButton,
  totalSteps,
}: FillingInfoWrapperProps) {
  const isLastStep = activeStep === totalSteps - 1;
  const { firstName, lastName } = useUserStore();
  return (
    <div className={styles.fillingInfoFormWrapper}>
      <h1>
        Welcome to ImpactFlow, {firstName} {lastName}
      </h1>
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
            {!hidePrevButton && <PreviousStepperButton />}
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
