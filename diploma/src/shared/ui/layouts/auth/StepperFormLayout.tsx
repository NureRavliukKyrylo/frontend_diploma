import styles from "./styles/StepFormLayout.module.scss";
import { LanguageSwitcherButton } from "../../buttons";
import { ContactsButton } from "../../buttons";

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
        <div className={styles.stepperFormWrapper}>{children}</div>

        <div className={styles.troubleStepFormIssue}>
          <div className={styles.textTroubleStepFormIssue}>
            <div className={styles.lineDividerIssueBlock}>
              <div className={styles.lineDividerIssue}></div>
            </div>
            <div className={styles.textDetailIssue}>
              <div className={styles.textInfoStepperForm}>
                <h1>Having trouble?</h1>
                <p>
                  Feel free to contact us and we will always help you through
                  the process
                </p>
              </div>
              <div className={styles.contactsButtonStepperForm}>
                <ContactsButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
