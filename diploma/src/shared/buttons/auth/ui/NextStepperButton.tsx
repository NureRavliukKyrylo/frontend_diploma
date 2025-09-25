import { useStepperStore } from "../../../../entities/user";
import styles from "./../styles/StepperButtons.module.scss";

export const NextStepperButton = () => {
  const { nextStep } = useStepperStore();
  return (
    <>
      <button className={styles.nextStepperButton} onClick={nextStep}>
        Skip
      </button>
    </>
  );
};
