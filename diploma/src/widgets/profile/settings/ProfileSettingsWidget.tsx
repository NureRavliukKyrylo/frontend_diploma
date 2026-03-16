import { AnimatePresence, motion } from "framer-motion";
import { SettingsWrapper } from "@shared/ui/wrappers";
import { profileSettingsForms } from "./configs/profileSettingForms";
import { profileSettingsTabs } from "./configs/profileSettingTabs";
import { Toggle } from "@shared/ui";
import styles from "./ProfileSettingsWidget.module.scss";
import { LogoutButton } from "@features/auth";
import { BackButton } from "@shared/ui/buttons";
import { useProfileTabs, type ProfileSettingsMode } from "@entities/user";
import { profileRoutes } from "@shared/routes";
import { useSearch } from "@tanstack/react-router";

export function ProfileSettingsWidget() {
  const search = useSearch({ from: "/_masterLayout/profile/settings/" });
  const { activeTab, handleTabChange } = useProfileTabs<ProfileSettingsMode>({
    search,
    navigateParams: "/profile/settings/",
  });
  const { component, wrapperProps } = profileSettingsForms[activeTab];

  return (
    <div className={styles.blockSettingsProfileForms}>
      <div className={styles.blockActionsProfileSettings}>
        <div className={styles.backAndToggleSection}>
          <div className={styles.backWrapper}>
            <BackButton
              from={profileRoutes.settingsFrom}
              to=".."
              className={styles.backButtonProfile}
            />
          </div>
          <Toggle<ProfileSettingsMode>
            tabs={profileSettingsTabs}
            activeValue={activeTab}
            onChange={handleTabChange}
            buttonClassName={styles.toggleProfileSettingsButton}
            activeButtonClassName={styles.toggleProfileSettingsButtonActive}
            className={styles.toggleProfileSettings}
          />
        </div>
        <div className={styles.logoutWrapper}>
          <LogoutButton />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <SettingsWrapper
            settingsTitle={wrapperProps?.settingsTitle}
            settingsDescription={wrapperProps?.settingsDescription}
          >
            {component}
          </SettingsWrapper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
