import styles from "./PasswordProfileForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { ProfilePasswordInput } from "@shared/ui/inputs";
import { Switch } from "@heroui/react";

export function PasswordProfileForm({}) {
  return (
    <form className={styles.passwordInfoProfileForm}>
      <div className={styles.securityProfileSection}>
        <div className={styles.passwordProfileText}>
          <h1>Password</h1>
          <p>Set a password to protect your account</p>
        </div>
        <div className={styles.formInfoPasswordProfile}>
          <ProfilePasswordInput name="password" id="password" value={"some"} />
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
          <Switch
            isSelected={true}
            onValueChange={() => {
              return true;
            }}
            aria-label="Visibility toggle"
            classNames={{
              base: "scale-80 sm:scale-90 lg:scale-110",
              wrapper: "bg-[rgba(44,44,44,0.6)]",
            }}
          />
        </div>
        <div className={styles.formSecuritySwitch}></div>
      </div>
      <div className={styles.blockPasswordButtons}>
        <BaseButtonWrapper
          loading={false}
          className={styles.changePasswordButton}
        >
          CHANGE PASSWORD
        </BaseButtonWrapper>
      </div>
    </form>
  );
}
