import { ChangePasswordVerificationForm } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./ChangePasswordButton.module.scss";
import { useUserProfileStore, useUserStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const ChangePasswordVerificationContent = () => {
  const { t } = useTranslation("profile");
  const { nextVerificationStep } = useUserProfileStore();
  const { isPasswordSet } = useUserStore();

  return (
    <VerificationWrapper
      title={
        isPasswordSet
          ? t("security.changePassword.resetTitle")
          : t("security.changePassword.setTitle")
      }
      description={
        isPasswordSet
          ? t("security.changePassword.resetDescription")
          : t("security.changePassword.setDescription")
      }
    >
      <div className={styles.verificationBlock}>
        <ChangePasswordVerificationForm
          onSuccess={() => nextVerificationStep("changePassword")}
        />
      </div>
    </VerificationWrapper>
  );
};
