import styles from "./LinksForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";
import { ProfileSocialNetworksInput } from "@shared/ui/inputs";
import { useSocialLinksSettingsForm } from "../model/useSocialLinksSettingsForm";

export function LinksForm({}) {
  const { formik, isLoading, errorMessage } = useSocialLinksSettingsForm();
  console.log(formik.values);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.linksInfoProfileForm}
    >
      <div className={styles.linksProfile}>
        <div className={styles.linksProfileText}>
          <h1>Social profiles</h1>
          <p>
            Manage your social links. Only selected links will be visible on
            your public profile.
          </p>
        </div>
        <div className={styles.formInfolinksProfile}>
          {SOCIAL_PLATFORMS.map(({ key, placeholder, icon }) => {
            return (
              <ProfileSocialNetworksInput
                key={key}
                name={`socialLinks.${key}.url`}
                placeholder={placeholder}
                icon={icon}
                value={formik.values.socialLinks[key]?.url ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                switchValue={formik.values.socialLinks[key]?.visible ?? false}
                onSwitchChange={(val) =>
                  formik.setFieldValue(`socialLinks.${key}.visible`, val)
                }
              />
            );
          })}
        </div>
      </div>
      <div className={styles.blockLinksButtons}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.saveProfileLinksButton}
          type="submit"
        >
          SAVE
        </BaseButtonWrapper>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
}
