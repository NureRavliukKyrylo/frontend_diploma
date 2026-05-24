import { ProfileAvatar } from "@entities/user";
import styles from "./UserHeaderWidget.module.scss";
import { DefaultAvatar } from "@shared/assets/images/user";

interface UserHeaderWidgetProps {
  image?: string;
  name: string;
  email?: string;
  children?: React.ReactNode;
}

export const UserHeaderWidget = ({
  image,
  name,
  email,
  children,
}: UserHeaderWidgetProps) => {
  return (
    <div className={styles.avatarBlockInfoSideBar}>
      <div className={styles.avatarBlock}>
        <ProfileAvatar avatar={image ?? DefaultAvatar} level={13} />
      </div>
      <h1 className={styles.fullNameUser}>{name ?? "Unknown"}</h1>
      <div className={styles.wrapperInfoProfileUser}>
        <h1 className={styles.emailUser}>{email ?? "Unknown"}</h1>
      </div>
      <div className={styles.childrenBlock}>{children}</div>
    </div>
  );
};
