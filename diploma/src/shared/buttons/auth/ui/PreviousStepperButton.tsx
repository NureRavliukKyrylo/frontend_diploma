import { useStepperStore } from "../../../../entities/user";
import styles from "./../styles/StepperButtons.module.scss";

export const PreviousStepperButton = () => {
  const { prevStep } = useStepperStore();
  return (
    <>
      <button className={styles.prevStepperButton} onClick={prevStep}>
        Back
      </button>
    </>
  );
};
