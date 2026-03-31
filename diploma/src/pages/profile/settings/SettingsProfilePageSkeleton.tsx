import { Skeleton } from "@heroui/skeleton";
import { UserHeaderWidgetSkeleton } from "@widgets/profile";
import styles from "./SettingsProfilePage.module.scss";

export const SettingsProfilePageSkeleton = () => {
  return (
    <div className={styles.settingsProfileBlock}>
      <div className={styles.sideBarProfileSettingsBlock}>
        <UserHeaderWidgetSkeleton />
        <Skeleton className={styles.skDeleteButton} />
      </div>

      <div className={styles.blockSettingsProfileForms}>
        <div className={styles.blockActionsProfileSettings}>
          <div className={styles.backAndToggleSection}>
            <Skeleton className={styles.skBackBtn} />
            <Skeleton className={styles.skToggle} />
          </div>
          <Skeleton className={styles.skLogoutBtn} />
        </div>
        <Skeleton className={styles.skContent} />
      </div>
    </div>
  );
};
