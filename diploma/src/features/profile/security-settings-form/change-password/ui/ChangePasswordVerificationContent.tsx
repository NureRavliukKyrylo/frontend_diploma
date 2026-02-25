import { ChangePasswordVerificationForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { useUserProfileStore, useUserStore } from "@entities/user";

export const ChangePasswordVerificationContent = () => {
  const { nextVerificationStep } = useUserProfileStore();
  const { isPasswordSet } = useUserStore();

  const title = isPasswordSet ? "Reset Password" : "Set New Password";
  const description = isPasswordSet
    ? "Reset your password quickly and securely to regain access"
    : "Set a new password to secure your account";

  return (
    <VerificationWrapper title={title} description={description}>
      <div className={styles.verificationBlock}>
        <ChangePasswordVerificationForm
          onSuccess={() => nextVerificationStep("changePassword")}
        />
      </div>
    </VerificationWrapper>
  );
};
