import { ProfileSettingsWidget } from "@widgets/profile";
import styles from "./SettingsProfilePage.module.scss";
import { UserHeaderWidget } from "@widgets/profile";
import { DeleteProfileButton } from "@features/profile";
import { profileQuery } from "@entities/user/profile";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFullName } from "@entities/user";

export function SettingsProfilePage() {
  const { data: user } = useSuspenseQuery(profileQuery.all());

  return (
    <div className={styles.settingsProfileBlock}>
      <div className={styles.sideBarProfileSettingsBlock}>
        <UserHeaderWidget
          image={user?.profile?.avatarUrl}
          name={getFullName(user.firstName, user.lastName)}
          email={user?.email}
        >
          <DeleteProfileButton />
        </UserHeaderWidget>
      </div>
      <ProfileSettingsWidget />
    </div>
  );
}
