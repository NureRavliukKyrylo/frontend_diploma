import { TwoFactorVerificationProfileForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./TwoFactor.module.scss";
import { useUserProfileStore } from "@entities/user";
import { useLogout } from "@features/auth";
import { useTranslation } from "react-i18next";

export const TwoFactorEnableVerificationContent = () => {
  const { t } = useTranslation("profile");
  const { closeVerificationModal } = useUserProfileStore();
  const { handleLogout } = useLogout(undefined, false);
  const onSuccess = async () => {
    await handleLogout();
    closeVerificationModal("twoFactorEnable");
  };

  return (
    <VerificationWrapper
      title={t("security.twoFactor.title")}
      description={t("security.twoFactor.enableDescription")}
    >
      <div className={styles.verificationBlock}>
        <TwoFactorVerificationProfileForm
          verificationType="enable"
          onSuccess={onSuccess}
        />
      </div>
    </VerificationWrapper>
  );
};
