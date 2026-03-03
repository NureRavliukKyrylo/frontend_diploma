import type { ReactNode } from "react";
import styles from "./FillingInfoWrapper.module.scss";
import { InfoSign } from "@shared/assets/icons/info";
import { BackButton } from "@shared/ui/buttons";
import { motion, AnimatePresence } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Arrow } from "@shared/assets/icons/actions";

interface FillingInfoWrapperProps {
  message: string;
  formTitle: string;
  formDescription: string;
  formId: string;
  children: ReactNode;
  activeStep: number;
  hideSkipButton?: boolean;
  totalSteps: number;
  firstName?: string;
  lastName?: string;
  isLoading?: boolean;
  prevStep: () => void;
  skipStep: () => void;
}

export function FillingInfoWrapper({
  children,
  message,
  formTitle,
  formDescription,
  formId,
  activeStep,
  hideSkipButton,
  totalSteps,
  firstName,
  lastName,
  isLoading,
  prevStep,
  skipStep,
}: FillingInfoWrapperProps) {
  const isLastStep = activeStep === totalSteps - 1;
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
            {activeStep !== 0 && (
              <BaseButtonWrapper className={styles.backStep} onClick={prevStep}>
                <img src={Arrow} alt="Back" className={styles.arrowIcon} />{" "}
              </BaseButtonWrapper>
            )}
            <div className={styles.interactStepperButtons}>
              {!hideSkipButton && !isLastStep && (
                <BaseButtonWrapper
                  className={styles.skipStepperButton}
                  onClick={skipStep}
                >
                  Skip
                </BaseButtonWrapper>
              )}
              <BaseButtonWrapper
                loading={isLoading}
                className={styles.nextStepperButton}
                form={formId}
              >
                Save & Next
              </BaseButtonWrapper>
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
