import styles from "./LinksForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";
import { ProfileSocialNetworksInput } from "@shared/ui/inputs";
import { useSocialLinksSettingsForm } from "../model/useSocialLinksSettingsForm";
import { motion } from "framer-motion";

export function LinksForm({}) {
  const { formik, isLoading, errorMessage } = useSocialLinksSettingsForm();

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
            const fieldError = formik.errors.socialLinks?.[key] as
              | { url?: string }
              | undefined;
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
                error={formik.submitCount > 0 ? (fieldError?.url ?? "") : ""}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.blockLinksButtons}>
        <motion.div
          animate={{ x: 0 }}
          whileHover={{ x: [0, -4, 4, -4, 4, 0] }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className={styles.resetProfileLinksButton}
        >
          <BaseButtonWrapper
            onClick={() => {
              formik.handleReset(null);
            }}
            type="button"
            className={styles.resetButton}
          >
            RESET
          </BaseButtonWrapper>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={styles.saveProfileLinksButton}
        >
          <BaseButtonWrapper
            loading={isLoading}
            type="submit"
            className={styles.saveButton}
          >
            SAVE
          </BaseButtonWrapper>
        </motion.div>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
}
