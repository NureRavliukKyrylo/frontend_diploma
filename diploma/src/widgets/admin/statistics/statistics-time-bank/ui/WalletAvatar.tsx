import type { AdminTimeBankTopUser } from "@entities/admin";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

export const WalletAvatar = ({ user }: { user: AdminTimeBankTopUser }) => {
  const source = user.displayName || user.email || user.userId;
  const initials =
    source
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "IF";

  return (
    <span className={styles.walletAvatar}>
      {user.avatarUrl ? <img src={user.avatarUrl} alt={source} /> : initials}
    </span>
  );
};
