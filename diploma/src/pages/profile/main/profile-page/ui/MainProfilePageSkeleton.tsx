import { Skeleton } from "@heroui/react";
import styles from "./MainProfilePage.module.scss";
import { UserHeaderWidgetSkeleton } from "@widgets/profile";

export const MainProfilePageSkeleton = () => {
  return (
    <div className={styles.mainProfileBlock}>
      <div className={styles.sideBarProfileBlock}>
        <UserHeaderWidgetSkeleton />

        <div className={styles.organizationBlock}>
          <Skeleton className={styles.skOrgHeader} />
          <Skeleton className={styles.skOrgBody} />
        </div>

        <div className={styles.socialPlatformsWrapper}>
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className={styles.skSocialItem} />
          ))}
        </div>
      </div>

      <div className={styles.actionsChangeBlock}>
        <Skeleton className={styles.skToggle} />
        <Skeleton className={styles.skSettingsBtn} />
      </div>
      <div className={styles.userActionsBlock}>
        <Skeleton className={styles.skContent} />
      </div>
    </div>
  );
};
