import styles from "./SecuritySettingsForm.module.scss";
import { ProfilePasswordInput } from "@shared/ui/inputs";
import { ProfileEmailInput } from "@shared/ui/inputs";
import { VerificationModal } from "./VerificationModal";
import { profileQuery } from "@entities/user/profile";
import { ChangePasswordButton } from "../../change-password";
import { ChangeEmailButton } from "../../change-email";
import { TwoFactorSwitch } from "../../set-two-factor";
import { useQuery } from "@tanstack/react-query";
import { ConnectedLinks } from "../../connected-links";
import { useUserStore } from "@entities/user";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function PasswordProfileForm() {
  const { t } = useTranslation("profile");
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { data: user } = useQuery({
    ...profileQuery.all(),
    enabled: isAuthenticated,
  });
  const { isPasswordSet, setIsPasswordSet } = useUserStore();
  const isPasswordConnected =
    user?.connectedServices.find((s) => s.provider === "password")?.connected ??
    false;

  useEffect(() => {
    setIsPasswordSet(isPasswordConnected);
  }, [isPasswordConnected]);

  return (
    <>
      <form className={styles.passwordInfoProfileForm}>
        <div className={styles.securityProfileSection}>
          <div className={styles.passwordProfileText}>
            <h1>{t("security.password.title")}</h1>
            <p>{t("security.password.description")}</p>
          </div>
          <div className={styles.formInfoPasswordProfile}>
            {isPasswordSet && (
              <ProfilePasswordInput value={"MOCKDATAFORUSER"} disabled />
            )}
            <ChangePasswordButton />
          </div>
        </div>
        <div className={styles.lineDividerProfileSettings} />
        <div className={styles.securityProfileSection}>
          <div className={styles.passwordProfileText}>
            <h1>{t("security.twoFactor.title")}</h1>
            <p>{t("security.twoFactor.description")}</p>
          </div>
          <div className={styles.formInfoSwitchEnabled}>
            <TwoFactorSwitch />
            <h1>{t("security.twoFactor.title")}</h1>
          </div>
        </div>
        <div className={styles.lineDividerProfileSettings} />
        <div className={styles.securityProfileSection}>
          <div className={styles.passwordProfileText}>
            <h1>{t("security.email.title")}</h1>
            <p>{t("security.email.description")}</p>
          </div>
          <div className={styles.formInfoPasswordProfile}>
            <ProfileEmailInput value={user?.email} disabled />
            <ChangeEmailButton />
          </div>
        </div>
        <div className={styles.connectedLinksBlock}>
          <div className={styles.connectedLinksList}>
            <ConnectedLinks />
          </div>
        </div>
      </form>
      <VerificationModal />
    </>
  );
}
