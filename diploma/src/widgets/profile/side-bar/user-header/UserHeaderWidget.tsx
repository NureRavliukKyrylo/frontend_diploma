import { ProfileAvatar } from "@entities/user";
import styles from "./UserHeaderWidget.module.scss";
import { InstagramIcon } from "@shared/assets/icons/brands";

interface UserHeaderWidgetProps {
  image?: string;
  name?: string;
  email?: string;
  phone?: number;
  children?: React.ReactNode;
}
//remove partially later and replace with real data
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
          <ProfileAvatar avatar={InstagramIcon} level={13} />
        </div>
        <h1>Shestakov Mykola</h1>
        <div className={styles.wrapperInfoProfileUser}>
          <h1>example@gmail.com</h1>
        </div>
        <div className={styles.wrapperInfoProfileUser}>
          <h1>+380 (095) 123 45 67</h1>
        </div>
        {children}
      </div>
    </>
  );
};
