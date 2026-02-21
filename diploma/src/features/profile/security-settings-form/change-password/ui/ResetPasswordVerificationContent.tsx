import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { ProfilePasswordInput } from "@shared/ui/inputs";
import { useSendNewPassword } from "../model/useSendNewPassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";

export const ResetPasswordVerificationContent = () => {
  const { formik, errorMessage, isLoading } = useSendNewPassword();

  return (
    <VerificationWrapper
      title="Reset Password"
      description="Set a strong password to secure access.
Always stay safe"
    >
      <form
        className={styles.verificationChangePassword}
        onSubmit={formik.handleSubmit}
      >
        <ProfilePasswordInput
          name="newPassword"
          variant="verification"
          placeholder="Set new password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 ? formik.errors.newPassword : ""}
        />
        <ProfilePasswordInput
          name="confirmPassword"
          variant="verification"
          placeholder="Repeat password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 ? formik.errors.confirmPassword : ""}
        />
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.changePasswordButton}
          type="submit"
        >
          Save Password
        </BaseButtonWrapper>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </VerificationWrapper>
  );
};
