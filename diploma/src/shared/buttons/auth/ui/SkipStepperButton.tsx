import { useAuthStore } from "../../../../entities/user";
import styles from "./../styles/StepperButtons.module.scss";

export const SkipStepperButton = () => {
  const { nextStep } = useAuthStore();
  return (
    <>
      <button className={styles.skipStepperButton} onClick={nextStep}>
        Skip
      </button>
    </>
  );
};
