import styles from "./../styles/StepFormLayout.module.scss";
import { LanguageSwitcherButton } from "../../../buttons/common";

interface StepFormLayoutProps {
  children: React.ReactNode;
}

export const StepperFormLayout: React.FC<StepFormLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles.stepFormWrapper}>
      <div className={styles.innerStepForm}>
        <div className={styles.localizationStepperButtonWrapper}>
          <LanguageSwitcherButton />
        </div>
        {children}
        <div className={styles.troubleStepFormIssue}>
          <h1>Having trouble?</h1>
          <p>
            Feel free to contact us and we will always help you through the
            process
          </p>
        </div>
      </div>
    </div>
  );
};
