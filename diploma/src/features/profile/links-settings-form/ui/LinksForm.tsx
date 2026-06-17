import styles from "./LinksForm.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { getSocialPlatforms } from "@shared/config/constants";
import { ProfileSocialNetworksInput } from "@shared/ui/inputs";
import { useSocialLinksSettingsForm } from "../model/useSocialLinksSettingsForm";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function LinksForm({}) {
  const { formik, isLoading, errorMessage } = useSocialLinksSettingsForm();
  const { t } = useTranslation();
  const socialPlatforms = getSocialPlatforms(t);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.linksInfoProfileForm}
    >
      <div className={styles.linksProfile}>
        <div className={styles.linksProfileText}>
          <h1>{t("profile:settings.links.socialTitle")}</h1>
          <p>{t("profile:settings.links.socialDescription")}</p>
        </div>
        <div className={styles.formInfolinksProfile}>
          {socialPlatforms.map(({ key, placeholder, icon }) => {
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
            {t("profile:settings.actions.reset")}
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
            {t("profile:settings.actions.save")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
}
