import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../PasswordProfileForm.module.scss";
import { ProfilePasswordInput } from "@shared/ui/inputs";

export const ResetPasswordVerificationContent = () => {
  return (
    <VerificationWrapper
      title="Reset Password"
      description="Set a strong password to secure access.
Always stay safe"
    >
      <div className={styles.verificationTwoFactorBlock}>
        <ProfilePasswordInput
          variant="verification"
          placeholder="Set new password"
          value={"asdasd"}
        />
        <ProfilePasswordInput
          variant="verification"
          placeholder="Repeat password"
        />
      </div>
    </VerificationWrapper>
  );
};
