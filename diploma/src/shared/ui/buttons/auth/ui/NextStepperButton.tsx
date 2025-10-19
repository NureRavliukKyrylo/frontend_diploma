import styles from "./../styles/StepperButtons.module.scss";

interface NextStepperButtonProps {
  form?: string;
}

export const NextStepperButton: React.FC<NextStepperButtonProps> = ({
  form,
}) => {
  return (
    <button type="submit" className={styles.nextStepperButton} form={form}>
      Save & Next
    </button>
  );
};
