import { AnimatePresence, motion } from "framer-motion";
import { SettingsWrapper } from "@shared/ui/wrappers";
import { profileSettingsForms } from "./configs/profileSettingForms";
import { profileSettingsTabs } from "./configs/profileSettingTabs";
import { Toggle } from "@shared/ui";
import styles from "./ProfileSettingsWidget.module.scss";
import { LogoutButton } from "@features/auth";
import { BackButton } from "@shared/ui/buttons";
import {
  profileSettingsSearchDefaults,
  type ProfileSettingsMode,
} from "@entities/user";
import { profileRoutes } from "@shared/routes";
import { useNavigate, useSearch } from "@tanstack/react-router";

export function ProfileSettingsWidget() {
  const search = useSearch({ from: "/_masterLayout/profile/settings/" });
  const navigate = useNavigate({ from: "/profile/settings/" });

  const activeTab = search.tab as ProfileSettingsMode;
  const handleTabChange = (tab: ProfileSettingsMode) => {
    navigate({ search: { ...profileSettingsSearchDefaults, tab } });
  };

  const { component, wrapperProps } = profileSettingsForms[activeTab];

  return (
    <>
      <div className={styles.headerSideBar}>
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
          pillClassName={styles.toggleProfileSettingsPill}
          innerWrapperClassName={styles.toggleProfileSettingsInnerWrapper}
        />

        <div className={styles.logoutWrapper}>
          <LogoutButton />
        </div>
      </div>

      <div className={styles.settingsContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              x: -20,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
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
    </>
  );
}
