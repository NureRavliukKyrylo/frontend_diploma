import { ProfileSettingsWidget } from "@widgets/profile";
import styles from "./SettingsProfilePage.module.scss";
import { UserHeaderWidget } from "@widgets/profile";
import { DeleteProfileButton } from "@features/profile";
import { profileQuery } from "@entities/user/profile";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function SettingsProfilePage() {
  const { data: user, isLoading, error } = useSuspenseQuery(profileQuery.all());
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
          <DeleteProfileButton />
        </UserHeaderWidget>
      </div>
      <ProfileSettingsWidget />
    </div>
  );
}
