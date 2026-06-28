import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  formatAdminHoursFromMinutes,
  type AdminTimeBankTopUser,
} from "@entities/admin";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { WalletAvatar } from "./WalletAvatar";

interface TimeBankWalletsProps {
  users: AdminTimeBankTopUser[];
}

export const TimeBankWallets = ({ users }: TimeBankWalletsProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleUsers = showAll ? users : users.slice(0, 4);

  return (
    <div className={styles.walletsCard}>
      <div className={styles.categoryTableHeader}>
        <strong className={styles.categoryTableTitle}>Top wallets by balance</strong>
        {users.length > 4 && (
          <button
            type="button"
            className={styles.showWalletsButton}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less" : `Show all ${users.length}`}
          </button>
        )}
      </div>
      {users.length === 0 ? (
        <div className={styles.cardState}>No wallet balances found.</div>
      ) : (
        <div className={styles.walletGrid}>
          {visibleUsers.map((user) => (
            <Link
              key={user.userId}
              to="/admin/users"
              search={{
                Search: user.email || user.userId,
                Page: 1,
                PageSize: 12,
                OrderBy: "Newest",
              }}
              className={styles.walletRow}
            >
              <WalletAvatar user={user} />
              <span>
                <strong>{user.displayName || user.email || "Unknown user"}</strong>
                <em>{user.email || user.userId}</em>
              </span>
              <b>{formatAdminHoursFromMinutes(user.balanceMinutes)}</b>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
