import { ProfileSettingsWidget } from "@widgets/profile";
import styles from "./SettingsProfilePage.module.scss";
import { UserHeaderWidget } from "@widgets/profile";
import { DeleteAccountButton } from "@features/profile";
import { useProfile } from "@entities/user/profile";

export function SettingsProfilePage() {
  const { data: user, isLoading, error } = useProfile();

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className={styles.settingsProfileBlock}>
      <div className={styles.sideBarProfileSettingsBlock}>
        <UserHeaderWidget
          image={user?.profile?.avatarUrl}
          name={fullName}
          email={user?.email}
          phone={user?.profile?.phone}
        >
          <DeleteAccountButton />
        </UserHeaderWidget>
      </div>
      <ProfileSettingsWidget />
    </div>
  );
}
