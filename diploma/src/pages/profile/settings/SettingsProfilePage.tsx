import { ProfileSettingsWidget } from "@widgets/profile";
import styles from "./SettingsProfilePage.module.scss";
import { UserHeaderWidget } from "@widgets/profile";
import { DeleteAccountButton } from "@features/profile";

export function SettingsProfilePage() {
  return (
    <div className={styles.settingsProfileBlock}>
      <div className={styles.sideBarProfileSettingsBlock}>
        <UserHeaderWidget>
          <DeleteAccountButton />
        </UserHeaderWidget>
      </div>
      <ProfileSettingsWidget />
    </div>
  );
}
