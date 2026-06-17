import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./ChangeEmail.module.scss";
import { ProfileEmailInput } from "@shared/ui/inputs";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useSendChangeEmailRequest } from "../model/useSendChangeEmailRequest";
import { useUserProfileStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const NewEmailVerificationContent = () => {
  const { t } = useTranslation("profile");
  const { nextVerificationStep, setNewEmail } = useUserProfileStore();
  const { formik, errorMessage, isLoading } = useSendChangeEmailRequest({
    codeType: "new-code",
    onSuccess: () => {
      nextVerificationStep("emailVerification");
      setNewEmail(formik.values.newEmail ?? "");
    },
  });

  return (
    <VerificationWrapper
      title={t("security.changeEmail.title")}
      description={t("security.changeEmail.enterNew")}
    >
      <form className={styles.verificationEmail} onSubmit={formik.handleSubmit}>
        <ProfileEmailInput
          name="newEmail"
          variant="verification"
          placeholder={t("security.changeEmail.placeholder")}
          value={formik.values.newEmail}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 ? formik.errors.newEmail : ""}
        />
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.setNewEmailButton}
          type="submit"
        >
          {t("security.changeEmail.saveButton")}
        </BaseButtonWrapper>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </VerificationWrapper>
  );
};
