import { Skeleton } from "@heroui/skeleton";
import styles from "./UserHeaderWidget.module.scss";

export const UserHeaderWidgetSkeleton = () => {
  return (
    <div className={styles.avatarBlockInfoSideBar}>
      <Skeleton className={styles.skAvatar} />
      <Skeleton className={styles.skFullName} />
      <Skeleton className={styles.wrapperInfoProfileUserSkeleton} />
      <Skeleton className={styles.wrapperInfoProfileUserSkeleton} />
    </div>
  );
};
