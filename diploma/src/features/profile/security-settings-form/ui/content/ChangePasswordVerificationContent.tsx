import { ChangePasswordVerificationForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../PasswordProfileForm.module.scss";

export const ChangePasswordVerificationContent = () => {
  return (
    <VerificationWrapper
      title="Two-step verification"
      description="Enable two-step verification quickly and securely to protect your account"
    >
      <div className={styles.verificationTwoFactorBlock}>
        <ChangePasswordVerificationForm />
      </div>
    </VerificationWrapper>
  );
};
