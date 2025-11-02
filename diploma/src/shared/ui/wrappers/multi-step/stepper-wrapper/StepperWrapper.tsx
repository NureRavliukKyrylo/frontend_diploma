import styles from "./StepperWrapper.module.scss";
import { LanguageSwitcherButton } from "@shared/ui/buttons";
import { ContactsButton } from "@shared/ui/buttons";

interface StepperWrapperProps {
  children: React.ReactNode;
}

export const StepperWrapper: React.FC<StepperWrapperProps> = ({ children }) => {
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
