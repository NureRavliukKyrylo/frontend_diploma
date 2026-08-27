import styles from "./StepperWrapper.module.scss";
import { LanguageSwitcherButton } from "@shared/ui/buttons";
import { ContactsButton } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";

export const StepperWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation(["auth", "common"]);

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
                <h1>{t("filling.trouble.title")}</h1>
                <p>{t("filling.trouble.description")}</p>
              </div>
              <div className={styles.contactsButtonStepperForm}>
                <ContactsButton t={t} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
