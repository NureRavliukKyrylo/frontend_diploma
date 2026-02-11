import styles from "./SettingsWrapper.module.scss";

interface SettingsWrapperProps {
  children?: React.ReactNode;
  settingsTitle?: string;
  settingsDescription?: string;
}

export const SettingsWrapper = ({
  settingsTitle,
  settingsDescription,
  children,
}: SettingsWrapperProps) => {
  return (
    <div className={styles.profileSettingsWrapper}>
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
