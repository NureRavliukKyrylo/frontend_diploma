import styles from "./LinksForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { SOCIAL_PROFILE_CONFIG } from "../config/socialProfileConfig";
import { ProfileSocialNetworksInput } from "@shared/ui/inputs";

export function LinksForm({}) {
  return (
    <div className={styles.linksInfoProfileForm}>
      <div className={styles.linksProfile}>
        <div className={styles.linksProfileText}>
          <h1>Social profiles</h1>
          <p>
            Manage your social links. Only selected links will be visible on
            your public profile.
          </p>
        </div>
        <div className={styles.formInfolinksProfile}>
          {SOCIAL_PROFILE_CONFIG.map(({ key, placeholder, icon }) => {
            const switchName = `show${
              key.charAt(0).toUpperCase() + key.slice(1)
            }`;
            return (
              <ProfileSocialNetworksInput
                key={key}
                name={key}
                placeholder={placeholder}
                icon={icon}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.blockLinksButtons}>
        <BaseButtonWrapper
          loading={false}
          className={styles.saveProfileLinksButton}
        >
          SAVE
        </BaseButtonWrapper>
      </div>
    </div>
  );
}
