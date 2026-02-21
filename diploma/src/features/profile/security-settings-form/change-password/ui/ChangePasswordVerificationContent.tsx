import { ChangePasswordVerificationForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { useUserProfileStore } from "@entities/user";

export const ChangePasswordVerificationContent = () => {
  const { nextVerificationStep } = useUserProfileStore();
  return (
    <VerificationWrapper
      title="Reset Password"
      description="Reset your password quickly and securely
to regain access"
    >
      <div className={styles.verificationBlock}>
        <ChangePasswordVerificationForm
          onSuccess={() => {
            nextVerificationStep("changePassword");
          }}
        />
      </div>
    </VerificationWrapper>
  );
};
