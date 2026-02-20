import { Link } from "@tanstack/react-router";
import styles from "./../styles/ProfileAvatar.module.scss";
import { DefaultAvatar } from "@shared/assets/images/user";

interface ProfileAvatarProps {
  imageUrl?: string;
}
export function ProfieAvatar({ imageUrl }: ProfileAvatarProps) {
  return (
    <Link to="/profile" className={styles.profileAvatar}>
      <img src={imageUrl ?? DefaultAvatar} alt={"avatar"} />
    </Link>
  );
}
