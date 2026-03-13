import { TwoFactorVerificationProfileForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./TwoFactor.module.scss";
import { useUserProfileStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { queryClient } from "@shared/api";

export const TwoFactorDisableVerificationContent = () => {
  const { closeVerificationModal } = useUserProfileStore();
  return (
    <VerificationWrapper
      title="Two-step verification"
      description="Disable two-step verification quickly and securely to protect your account"
    >
      <div className={styles.verificationBlock}>
        <TwoFactorVerificationProfileForm
          verificationType="disable"
          onSuccess={() => {
            closeVerificationModal("twoFactorDisable");
            queryClient.invalidateQueries(profileQuery.all());
          }}
        />
      </div>
    </VerificationWrapper>
  );
};
