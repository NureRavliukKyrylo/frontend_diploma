import { useAuthStore } from "../../../../../entities/user";
import styles from "./../styles/StepperButtons.module.scss";
import { Arrow } from "@shared/assets/common";

export const PreviousStepperButton = () => {
  const { prevStep, activeStep } = useAuthStore();

  const isFirstStep = activeStep === 0;

  return (
    <>
      <button
        className={styles.prevStepperButton}
        onClick={prevStep}
        disabled={isFirstStep}
      >
        <img src={Arrow} alt="Back" className={styles.arrowIcon} />
      </button>
    </>
  );
};
