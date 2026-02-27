import { Avatar } from "@shared/ui";
import styles from "./ProfileAvatar.module.scss";
export { Avatar } from "@shared/ui";

interface ProfileAvatarProps {
  avatar: string;
  level: number;
}

export const ProfileAvatar = ({ avatar, level }: ProfileAvatarProps) => {
  return (
    <Avatar src={avatar} shape="rounded" className={styles.profileAvatarBlock}>
      <div className={styles.levelInfoAvatar}>
        <h1 className={styles.levelTextInfo}>{level}</h1>
      </div>
    </Avatar>
  );
};
