import { TwoFactorVerificationFormEnable } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";

export const TwoFactorVerificationContent = () => {
  return (
    <VerificationWrapper
      title="Two-step verification"
      description="Enable two-step verification quickly and securely to protect your account"
    >
      <div className={styles.verificationBlock}>
        <TwoFactorVerificationFormEnable />
      </div>
    </VerificationWrapper>
  );
};
