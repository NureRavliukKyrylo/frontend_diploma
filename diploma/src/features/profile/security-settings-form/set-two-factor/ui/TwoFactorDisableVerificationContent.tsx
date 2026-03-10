import { TwoFactorVerificationProfileForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./TwoFactor.module.scss";
import { OtpType } from "@shared/config/types";
import { useUserProfileStore } from "@entities/user";

export const TwoFactorDisableVerificationContent = () => {
  const { closeVerificationModal } = useUserProfileStore();
  return (
    <VerificationWrapper
      title="Two-step verification"
      description="Disable two-step verification quickly and securely to protect your account"
    >
      <div className={styles.verificationBlock}>
        <TwoFactorVerificationProfileForm
          otpType={OtpType.DisableTwoFactor}
          verificationType="disable"
          onSuccess={() => {
            closeVerificationModal("twoFactorDisable");
          }}
        />
      </div>
    </VerificationWrapper>
  );
};
