import { useAuthStore } from "../../../../entities/user";
import styles from "./../styles/StepperButtons.module.scss";

export const NextStepperButton = () => {
  const { nextStep } = useAuthStore();
  return (
    <>
      <button className={styles.nextStepperButton} onClick={nextStep}>
        Skip
      </button>
    </>
  );
};
