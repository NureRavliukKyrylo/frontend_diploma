import { useStepperStore } from "../../../entities/user";
import styles from "./StepperButtons.module.scss";

export const SkipStepperButton = () => {
  const { nextStep } = useStepperStore();
  return (
    <>
      <button className={styles.skipStepperButton} onClick={nextStep}>
        Skip
      </button>
    </>
  );
};
