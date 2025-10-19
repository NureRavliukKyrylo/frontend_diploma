import { useAuthStore } from "../../../../../entities/user";
import styles from "./../styles/StepperButtons.module.scss";

export const SkipStepperButton = () => {
  const { skipStep } = useAuthStore();
  return (
    <>
      <button className={styles.skipStepperButton} onClick={skipStep}>
        Skip
      </button>
    </>
  );
};
