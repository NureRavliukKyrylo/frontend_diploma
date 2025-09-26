import { useStepperStore } from "../../../../entities/user";
import styles from "./../styles/StepperButtons.module.scss";

export const PreviousStepperButton = () => {
  const { prevStep, activeStep } = useStepperStore();

  const isFirstStep = activeStep === 0;

  return (
    <>
      <button
        className={styles.prevStepperButton}
        onClick={prevStep}
        disabled={isFirstStep}
      >
        Back
      </button>
    </>
  );
};
