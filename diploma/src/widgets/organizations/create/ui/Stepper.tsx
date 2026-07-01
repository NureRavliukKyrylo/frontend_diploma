import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { IconCheck } from "@tabler/icons-react";
import {
  organizationCreateStepMeta,
  organizationCreateStepNumbers,
  type OrganizationCreateStep,
} from "../config/steps";
import styles from "./Stepper.module.scss";

interface OrganizationCreateStepperProps {
  currentStep: OrganizationCreateStep;
}

export const OrganizationCreateStepper = ({
  currentStep,
}: OrganizationCreateStepperProps) => {
  const { t } = useTranslation("organizations");
  const stepMeta = organizationCreateStepMeta[currentStep];
  const stepWidth = 58;
  const lineWidth = 58;
  const currentStepIndex = organizationCreateStepNumbers.indexOf(currentStep);
  const stepperTotalWidth =
    organizationCreateStepNumbers.length * stepWidth +
    (organizationCreateStepNumbers.length - 1) * lineWidth;
  const activeCircleCenter =
    currentStepIndex * (stepWidth + lineWidth) + stepWidth / 2;
  const activeOffset = activeCircleCenter - stepperTotalWidth / 2;

  return (
    <div className={styles.stepperContainer}>
      <div
        className={styles.stepper}
        aria-label={t("create.aria.steps")}
      >
        {organizationCreateStepNumbers.map((step, index) => {
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;
          const lineClass =
            index < currentStepIndex - 1
              ? styles.stepLineDone
              : index === currentStepIndex - 1
                ? styles.stepLineActive
                : "";

          return (
            <Fragment key={step}>
              <div
                className={`${styles.step} ${
                  isCompleted
                    ? styles.stepDone
                    : isActive
                      ? styles.stepActive
                      : styles.stepPending
                }`}
              >
                {isCompleted ? (
                  <IconCheck size={20} aria-hidden="true" />
                ) : (
                  step
                )}
              </div>
              {index < organizationCreateStepNumbers.length - 1 ? (
                <div className={`${styles.stepLine} ${lineClass}`} />
              ) : null}
            </Fragment>
          );
        })}
      </div>

      <div
        className={styles.stepperWrap}
        style={{ transform: `translateX(${activeOffset}px)` }}
      >
        <div className={styles.eyebrow}>
          <h1 className={styles.eyebrowText}>{t(stepMeta.titleKey)}</h1>
        </div>
        <p className={styles.stepperSub}>{t(stepMeta.subtitleKey)}</p>
      </div>
    </div>
  );
};
