import { Link } from "@tanstack/react-router";
import styles from "./HeaderAvatar.module.scss";
import { Avatar } from "@shared/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { profileQuery } from "@entities/user/profile";
import { DefaultAvatar } from "@shared/assets/images/user";

export function HeaderAvatar() {
  const { data: user } = useSuspenseQuery({ ...profileQuery.all() });
  return (
    <Link to="/profile" className={styles.wrapperHeaderAvatar}>
      <Avatar
        src={user.profile?.avatarUrl ?? DefaultAvatar}
        shape="circle"
        className={styles.headerAvatar}
      />
    </Link>
  );
}
