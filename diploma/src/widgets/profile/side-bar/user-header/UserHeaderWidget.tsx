import { ProfileAvatar } from "@entities/user";
import styles from "./UserHeaderWidget.module.scss";

interface UserHeaderWidgetProps {
  image: string;
  name: string;
  email: string;
  phone: string;
  children?: React.ReactNode;
}

export const UserHeaderWidget = ({
  image,
  name,
  email,
  phone,
  children,
}: UserHeaderWidgetProps) => {
  return (
    <>
      <div className={styles.avatarBlockInfoSideBar}>
        <div className={styles.avatarBlock}>
          <ProfileAvatar avatar={image ?? "test"} level={13} />
        </div>
        <h1>{name ?? "Unknown"}</h1>
        <div className={styles.wrapperInfoProfileUser}>
          <h1>{email ?? "Unknown"}</h1>
        </div>
        <div className={styles.wrapperInfoProfileUser}>
          <h1>{phone ?? "Unknown"}</h1>
        </div>
        {children}
      </div>
    </>
  );
};
