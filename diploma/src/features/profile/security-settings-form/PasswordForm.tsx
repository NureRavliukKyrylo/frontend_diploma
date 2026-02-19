import styles from "./PasswordProfileForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { ProfilePasswordInput } from "@shared/ui/inputs";
import { Switch } from "@shared/ui";
import { Edit } from "@shared/assets/icons/actions";
import { useState } from "react";
import { ProfileEmailInput } from "@shared/ui/inputs";
import { VerificationModal } from "./ui/modals/VerificationModal";
import { useUserProfileStore } from "@entities/user";

export function PasswordProfileForm({}) {
  const [isSelected, setIsSelected] = useState(false);
  const { openVerificationModal, nextVerificationStep } = useUserProfileStore();

  return (
    <>
      <button
        onClick={() => {
          nextVerificationStep("changePassword");
        }}
      >
        <h1>asdasdasdasdasd</h1>
      </button>
      <form className={styles.passwordInfoProfileForm}>
        <div className={styles.securityProfileSection}>
          <div className={styles.passwordProfileText}>
            <h1>Password</h1>
            <p>Set a password to protect your account</p>
          </div>
          <div className={styles.formInfoPasswordProfile}>
            <ProfilePasswordInput
              name="password"
              id="password"
              value={"some"}
            />
            <BaseButtonWrapper
              className={styles.editPasswordButton}
              type="button"
              onClick={() => {
                openVerificationModal("changePassword");
              }}
            >
              <img src={Edit} alt="pencil-icon" />
            </BaseButtonWrapper>
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
            <Switch
              isSelected={isSelected}
              onValueChange={(value) => {
                setIsSelected(value);

                if (value) {
                  openVerificationModal("twoFactor");
                }
              }}
              classNames={{
                base: "scale-80 sm:scale-90 lg:scale-100 group-data-[selected=true]:bg-[#8C0000]",
                wrapper: "bg-[rgba(44,44,44,0.6)]",
                thumb: "w-[20px] h-[20px]",
              }}
            />
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
            <ProfileEmailInput
              name="email"
              id="email"
              value={"example@gmail.com"}
            />
            <BaseButtonWrapper
              className={styles.editPasswordButton}
              type="button"
            >
              <img src={Edit} alt="pencil-icon" />
            </BaseButtonWrapper>
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
      </form>

      <VerificationModal />
    </>
  );
}
