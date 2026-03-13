import { useUserProfileStore } from "@entities/user";
import { UnlinkVerificationForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./UnlinkVerificationContent.module.scss";
import { capitalize } from "@shared/libs/text";
import { profileKeys } from "@entities/user/profile";
import { queryClient } from "@shared/api";

export const UnlinkVerificationContent = () => {
  const { unlinkTarget, closeVerificationModal } = useUserProfileStore();

  if (!unlinkTarget.platform) {
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
