import { Skeleton } from "@heroui/skeleton";
import styles from "./UserHeaderWidget.module.scss";

export const UserHeaderWidgetSkeleton = () => {
  return (
    <div className={styles.avatarBlockInfoSideBar}>
      <div className={styles.avatarBlock}>
        <Skeleton className={styles.skeletonAvatar} />
      </div>
      <Skeleton className={styles.skeletonFullName} />
      <Skeleton className={styles.wrapperInfoProfileUserSkeleton} />
      <Skeleton className={styles.wrapperInfoProfileUserSkeleton} />
    </div>
  );
};
