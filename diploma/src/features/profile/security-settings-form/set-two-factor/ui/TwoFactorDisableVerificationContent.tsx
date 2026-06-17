import { TwoFactorVerificationProfileForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./TwoFactor.module.scss";
import { useUserProfileStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { queryClient } from "@shared/api";
import { useTranslation } from "react-i18next";

export const TwoFactorDisableVerificationContent = () => {
  const { t } = useTranslation("profile");
  const { closeVerificationModal } = useUserProfileStore();

  return (
    <VerificationWrapper
      title={t("security.twoFactor.title")}
      description={t("security.twoFactor.disableDescription")}
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
