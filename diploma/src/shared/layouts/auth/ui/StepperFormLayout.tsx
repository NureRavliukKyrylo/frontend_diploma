import styles from "./../styles/StepFormLayout.module.scss";

interface StepFormLayoutProps {
  children: React.ReactNode;
}

export const StepperFormLayout: React.FC<StepFormLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles.stepFormWrapper}>
      <div className={styles.innerStepForm}>
        <div className={styles.localizationStepperButton}></div>
        {children}
        <div className={styles.troubleStepFormIssue}></div>
      </div>
    </div>
  );
};
