import { useUserProfileStore } from "@entities/user";
import { UnlinkVerificationForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./UnlinkVerificationContent.module.scss";
import { capitalize, queryClient } from "@shared/libs";
import { profileKeys } from "@entities/user/profile";

export const UnlinkVerificationContent = () => {
  const { unlinkTarget, closeVerificationModal } = useUserProfileStore();

  if (!unlinkTarget.platform || unlinkTarget.otpType === null) {
    return null;
  }

  const platform = capitalize(unlinkTarget.platform);

  return (
    <VerificationWrapper
      title={`Unlink ${platform}`}
      description={`Verify your identity to unlink your ${platform} account`}
    >
      <div className={styles.verificationBlock}>
        <UnlinkVerificationForm
          otpType={unlinkTarget.otpType}
          verificationLink={unlinkTarget.platform}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: profileKeys.all() });
            closeVerificationModal("unlink");
          }}
          platform={platform}
        />
      </div>
    </VerificationWrapper>
  );
};
