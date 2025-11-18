import styles from "./ProfileAvatar.module.scss";

interface ProfileAvatarProps {
  avatar: string;
  level: number;
}

export const ProfileAvatar = ({ avatar, level }: ProfileAvatarProps) => {
  return (
    <div
      className={styles.profileAvatarBlock}
      style={{ backgroundImage: `url(${avatar})` }}
    >
      <div className={styles.levelInfoAvatar}>
        <h1 className={styles.levelTextInfo}>{level}</h1>
      </div>
    </div>
  );
};
