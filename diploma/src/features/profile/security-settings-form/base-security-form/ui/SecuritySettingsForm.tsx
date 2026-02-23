import styles from "./SecuritySettingsForm.module.scss";
import { ProfilePasswordInput } from "@shared/ui/inputs";
import { ProfileEmailInput } from "@shared/ui/inputs";
import { VerificationModal } from "./VerificationModal";
import { profileQuery } from "@entities/user/profile";
import { ChangePasswordButton } from "../../change-password";
import { ChangeEmailButton } from "../../change-email";
import { TwoFactorSwitch } from "../../set-two-factor";
import { useQuery } from "@tanstack/react-query";

export function PasswordProfileForm({}) {
  const { data: user } = useQuery(profileQuery.all());

  return (
    <>
      <form className={styles.passwordInfoProfileForm}>
        <div className={styles.securityProfileSection}>
          <div className={styles.passwordProfileText}>
            <h1>Password</h1>
            <p>Set a password to protect your account</p>
          </div>
          <div className={styles.formInfoPasswordProfile}>
            <ProfilePasswordInput value={"MOCKDATAFORUSER"} disabled />
            <ChangePasswordButton />
          </div>
        </div>
        <div className={styles.lineDividerProfileSettings}></div>
        <div className={styles.securityProfileSection}>
          <div className={styles.passwordProfileText}>
            <h1>Two-step verification</h1>
            <p>
              We reconnect requiring a verification code in addition to your
              password
            </p>
          </div>
          <div className={styles.formInfoSwitchEnabled}>
            <TwoFactorSwitch />
            <h1>Two-step verification</h1>
          </div>
        </div>
        <div className={styles.lineDividerProfileSettings}></div>
        <div className={styles.securityProfileSection}>
          <div className={styles.passwordProfileText}>
            <h1>Email</h1>
            <p>
              Set an email address to secure your account and receive important
              updates
            </p>
          </div>
          <div className={styles.formInfoPasswordProfile}>
            <ProfileEmailInput value={user?.email} disabled />
            <ChangeEmailButton />
          </div>
        </div>
      </form>

      <VerificationModal />
    </>
  );
}
