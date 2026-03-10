import { TwoFactorVerificationProfileForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./TwoFactor.module.scss";
import { OtpType } from "@shared/config/types";
import { useUserProfileStore } from "@entities/user";
import { useLogout } from "@features/auth";

export const TwoFactorEnableVerificationContent = () => {
  const { closeVerificationModal } = useUserProfileStore();
  const { handleLogout } = useLogout(undefined, false);

  const onSuccess = async () => {
    await handleLogout();
    closeVerificationModal("twoFactorEnable");
  };

  return (
    <VerificationWrapper
      title="Two-step verification"
      description="Enable two-step verification quickly and securely to protect your account"
    >
      <div className={styles.verificationBlock}>
        <TwoFactorVerificationProfileForm
          otpType={OtpType.TwoFactor}
          verificationType="enable"
          onSuccess={onSuccess}
        />
      </div>
    </VerificationWrapper>
  );
};
