import { Skeleton } from "@heroui/react";
import { UserHeaderWidgetSkeleton } from "@widgets/profile";
import styles from "./SettingsProfilePage.module.scss";

export const SettingsProfilePageSkeleton = () => {
  return (
    <div className={styles.settingsProfileBlock}>
      <div className={styles.sideBarProfileSettingsBlock}>
        <UserHeaderWidgetSkeleton />
        <Skeleton className={styles.skDeleteButton} />
      </div>

      <Skeleton className={styles.skToggle} />

      <Skeleton className={styles.skContent} />
    </div>
  );
};
