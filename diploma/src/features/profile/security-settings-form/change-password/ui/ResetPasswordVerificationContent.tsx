import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./ChangePasswordButton.module.scss";
import { ProfilePasswordInput } from "@shared/ui/inputs";
import { useSendNewPassword } from "../model/useSendNewPassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useUserStore } from "@entities/user";

export const ResetPasswordVerificationContent = () => {
  const { formik, errorMessage, isLoading } = useSendNewPassword();
  const { isPasswordSet } = useUserStore();

  const title = isPasswordSet ? "Reset Password" : "Set New Password";
  const description = isPasswordSet
    ? "Reset your password quickly and securely to regain access"
    : "Set a new password to secure your account";

  return (
    <VerificationWrapper title={title} description={description}>
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
          showEyeButton={true}
        />
        <ProfilePasswordInput
          name="confirmPassword"
          variant="verification"
          placeholder="Repeat password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 ? formik.errors.confirmPassword : ""}
          showEyeButton={true}
        />
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.setNewPasswordButton}
          type="submit"
        >
          Save Password
        </BaseButtonWrapper>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </VerificationWrapper>
  );
};
