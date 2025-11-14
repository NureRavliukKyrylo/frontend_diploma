import styles from "./PasswordForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { ProfilePasswordInput } from "@shared/ui/inputs";

export function PasswordForm({}) {
  return (
    <div className={styles.passwordInfoProfileForm}>
      <div className={styles.passwordProfile}>
        <div className={styles.passwordProfileText}>
          <h1>Password settings</h1>
          <p>
            Enter your new password below and confirm it once you’ve received
            the verification code
          </p>
        </div>
        <div className={styles.formInfoPasswordProfile}>
          <ProfilePasswordInput />
          <ProfilePasswordInput />
          <ProfilePasswordInput />
        </div>
      </div>
      <div className={styles.blockPasswordButtons}>
        <BaseButtonWrapper
          loading={false}
          className={styles.changePasswordButton}
        >
          CHANGE PASSWORD
        </BaseButtonWrapper>
      </div>
    </div>
  );
}
