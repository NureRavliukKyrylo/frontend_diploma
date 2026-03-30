import { Skeleton } from "@heroui/skeleton";
import styles from "./MainProfilePage.module.scss";
import { UserHeaderWidgetSkeleton } from "@widgets/profile";

export const MainProfilePageSkeleton = () => {
  return (
    <div className={styles.mainProfileBlock}>
      <div className={styles.sideBarProfileBlock}>
        <UserHeaderWidgetSkeleton />

        <div className={styles.organizationBlock}>
          <div className={styles.organizationBlockHeader}>
            <Skeleton className={styles.orgBlockTitle} />
          </div>
          <div className={styles.organizationBlockContent}>
            <div className={styles.organizationsList}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={styles.organizationItem}>
                  <Skeleton className={styles.orgIcon} />
                  <Skeleton className={styles.orgName} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.socialPlatformsBlock}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={styles.socialPlatformItem} />
          ))}
        </div>
      </div>

      <div className={styles.mainWrapperUserInfo}>
        <div className={styles.actionsChangeBlock}>
          <Skeleton className={styles.toggleSkeleton} />
          <Skeleton className={styles.settingsButtonSkeleton} />
        </div>

        <div className={styles.userActionsBlock}>
          <div className={styles.mainContentArea}>
            <Skeleton className={styles.contentTitle} />
            <Skeleton className={styles.contentLine} />
            <Skeleton className={styles.contentLine} />
            <Skeleton className={styles.contentLineShort} />
            <div className={styles.contentGrid}>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className={styles.contentCard} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
