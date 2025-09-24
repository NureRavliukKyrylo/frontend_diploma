import { useStepperStore } from "../../../entities/user";
import styles from "./StepperButtons.module.scss";

export const PreviousStepperButton = () => {
  const { prevStep } = useStepperStore();
  return (
    <>
      <button className={styles.nextStepperButton} onClick={prevStep}>
        Skip
      </button>
    </>
  );
};
