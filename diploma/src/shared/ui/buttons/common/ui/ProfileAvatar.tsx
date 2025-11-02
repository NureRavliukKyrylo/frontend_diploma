import { Link } from "@tanstack/react-router";
import styles from "./../styles/ProfileAvatar.module.scss";
import { useAuthStore } from "@entities/user";
import { InstagramIcon } from "@shared/assets/icons/brands";

export function ProfieAvatar() {
  const { avatarUrl } = useAuthStore();
  return (
    <Link to="/profile" className={styles.profileAvatar}>
      <img src={avatarUrl || InstagramIcon} alt={"avatar"} />
    </Link>
  );
}
