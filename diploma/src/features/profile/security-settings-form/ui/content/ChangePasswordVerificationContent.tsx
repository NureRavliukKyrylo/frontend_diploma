import { ChangePasswordVerificationForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../PasswordProfileForm.module.scss";

export const ChangePasswordVerificationContent = () => {
  return (
    <VerificationWrapper
      title="Reset Password"
      description="Reset your password quickly and securely
to regain access"
    >
      <div className={styles.verificationTwoFactorBlock}>
        <ChangePasswordVerificationForm />
      </div>
    </VerificationWrapper>
  );
};
