import styles from "./SettingsWrapper.module.scss";

interface SettingsWrapperProps {
  profileAvatar: string;
  fullName: string;
  email: string;
  children?: React.ReactNode;
  settingsTitle: string;
  settingsDescription: string;
}

export const SettingsWrapper = ({
  profileAvatar,
  fullName,
  email,
  settingsTitle,
  settingsDescription,
  children,
}: SettingsWrapperProps) => {
  return (
    <div className={styles.profileSettingsWrapper}>
      <div className={styles.headerProfileSettings}>
        <img src={profileAvatar} alt="profileAvatar" />
        <div className={styles.userInfoProfileSettings}>
          <h1>{fullName}</h1>
          <p>{email}</p>
        </div>
      </div>
      <div className={styles.infoProfilePage}>
        <div className={styles.textInfoProfilePage}>
          <h1>{settingsTitle}</h1>
          <p>{settingsDescription}</p>
        </div>
        <div className={styles.lineDividerProfileSettings}></div>
        {children}
      </div>
    </div>
  );
};
