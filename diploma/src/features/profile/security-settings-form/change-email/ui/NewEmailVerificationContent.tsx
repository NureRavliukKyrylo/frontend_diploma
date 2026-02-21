import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { ProfileEmailInput } from "@shared/ui/inputs";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useSendChangeEmailRequest } from "../model/useSendChangeEmailRequest";
import { useUserProfileStore } from "@entities/user";

export const NewEmailVerificationContent = () => {
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
      title="Change email"
      description="Enter your new email below. We'll send a code to confirm it"
    >
      <form
        className={styles.verificationChangePassword}
        onSubmit={formik.handleSubmit}
      >
        <ProfileEmailInput
          name="newEmail"
          variant="verification"
          placeholder="Set new email"
          value={formik.values.newEmail}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 ? formik.errors.newEmail : ""}
        />
        <div className={styles.newEmailVerificationBlock}>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.changePasswordButton}
            type="submit"
          >
            Save New Email
          </BaseButtonWrapper>
          {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        </div>
      </form>
    </VerificationWrapper>
  );
};
