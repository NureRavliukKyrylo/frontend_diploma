import type { TimeTransaction } from "@entities/offer/model";
import styles from "./TransactionListItem.module.scss";
import {
  TRANSACTION_SOURCE_ICON,
  TRANSACTION_TYPE_CONFIG,
} from "@entities/offer/config/transactionTypeConfig";

interface TransactionListItemProps {
  transaction: TimeTransaction;
}

export const TransactionListItem = ({
  transaction,
}: TransactionListItemProps) => {
  const { label, wrapperColor, iconColor, fontColor } =
    TRANSACTION_TYPE_CONFIG[transaction.type];
  const Icon = TRANSACTION_SOURCE_ICON[transaction.sourceType];

  const isPositive = [
    "earn",
    "reservationRelease",
    "adminAdjustmentPlus",
    "giftIn",
  ].includes(transaction.type);

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper} style={{ background: wrapperColor }}>
        <Icon className={styles.icon} style={{ color: iconColor }} />
      </div>

      <div className={styles.content}>
        <span className={styles.title}>{transaction.comment ?? label}</span>
        <div className={styles.meta}>
          <span
            className={styles.badge}
            style={{ background: wrapperColor, color: fontColor }}
          >
            {label}
          </span>
        </div>
      </div>

      <div className={styles.rightContent}>
        <span
          className={styles.amount}
          style={{ color: isPositive ? "#3d995f" : "#a80b0b" }}
        >
          {isPositive ? "+" : "-"}
          {Math.abs(transaction.amountMinutes)}m
        </span>
        <span className={styles.balance}>
          Balance: {transaction.balanceAfterMinutes}m
        </span>
      </div>
    </div>
  );
};
