import { STEPS } from "../config/createTaskDrawerConfig";
import styles from "../CreateTaskDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface CreateTaskStepIndicatorProps {
  activeStep: number;
  onStepClick: (step: number) => void;
}

export const CreateTaskStepIndicator = ({
  activeStep,
  onStepClick,
}: CreateTaskStepIndicatorProps) => {
  const { t } = useTranslation("task");

  return (
    <section className={styles.stepCard}>
      <nav className={styles.stepRow} aria-label={t("create.stepsLabel")}>
        {STEPS.map((step, index) => {
          const isActive = index === activeStep;
          const isDone = index < activeStep;
          const stateClassName = isActive
            ? styles.stepGroupActive
            : isDone
              ? styles.stepGroupDone
              : styles.stepGroupPending;
          const circleStateClassName = isDone
            ? styles.stepCircleDone
            : isActive
              ? styles.stepCircleActive
              : styles.stepCirclePending;

          return (
            <div key={step.label} className={styles.stepUnit}>
              {index > 0 ? (
                <span
                  className={`${styles.stepLine} ${
                    index <= activeStep ? styles.stepLineDone : ""
                  }`}
                />
              ) : null}
              <button
                type="button"
                className={`${styles.stepGroup} ${stateClassName}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => onStepClick(index)}
              >
                <span
                  className={`${styles.stepCircle} ${circleStateClassName}`}
                >
                  {isDone ? (
                    <i className="ti ti-check" aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className={styles.stepLabel}>{t(step.label)}</span>
              </button>
            </div>
          );
        })}
      </nav>
    </section>
  );
};
