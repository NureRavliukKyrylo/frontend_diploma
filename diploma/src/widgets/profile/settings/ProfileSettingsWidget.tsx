import { AnimatePresence, motion } from "framer-motion";
import { SettingsWrapper } from "@shared/ui/wrappers";
import { profileSettingsForms } from "./configs/profileSettingForms";
import { profileSettingsTabs } from "./configs/profileSettingTabs";
import { Toggle } from "@shared/ui";
import styles from "./ProfileSettingsWidget.module.scss";
import { LogoutButton } from "@features/auth";
import { BackButton } from "@shared/ui/buttons";
import { useUserProfileStore, type ProfileSettingsMode } from "@entities/user";

export function ProfileSettingsWidget() {
  const { settingsMode, setSettingsMode } = useUserProfileStore();
  const { component, wrapperProps } = profileSettingsForms[settingsMode];

  return (
    <div className={styles.blockSettingsProfileForms}>
      <div className={styles.blockActionsProfileSettings}>
        <div className={styles.backAndToggleSection}>
          <BackButton className={styles.backButtonProfile} />
          <Toggle<ProfileSettingsMode>
            tabs={profileSettingsTabs}
            activeValue={settingsMode}
            onChange={setSettingsMode}
            buttonClassName={styles.toggleProfileSettingsButton}
            activeButtonClassName={styles.toggleProfileSettingsButtonActive}
            className={styles.toggleProfileSettings}
          />
        </div>
        <LogoutButton />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={settingsMode}
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
