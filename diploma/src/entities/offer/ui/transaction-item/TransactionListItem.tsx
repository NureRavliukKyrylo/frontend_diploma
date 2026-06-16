import type { TimeTransaction } from "@entities/offer/model";
import styles from "./TransactionListItem.module.scss";
import {
  TRANSACTION_SOURCE_ICON,
  TRANSACTION_TYPE_CONFIG,
} from "@entities/offer/config/transactionTypeConfig";
import { useTranslation } from "react-i18next";

interface TransactionListItemProps {
  transaction: TimeTransaction;
}

export const TransactionListItem = ({
  transaction,
}: TransactionListItemProps) => {
  const { t } = useTranslation("timeBank");
  const { wrapperColor, iconColor, fontColor } =
    TRANSACTION_TYPE_CONFIG[transaction.type];
  const Icon = TRANSACTION_SOURCE_ICON[transaction.sourceType];
  const localizedLabel = t(`transactions.types.${transaction.type}`);

  const isPositive = [
    "earn",
    "reservationRelease",
    "adminAdjustmentPlus",
    "giftIn",
  ].includes(transaction.type);
  const isNeutral = transaction.type === "reservation";

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper} style={{ background: wrapperColor }}>
        <Icon className={styles.icon} style={{ color: iconColor }} />
      </div>

      <div className={styles.content}>
        <span className={styles.title}>
          {transaction.comment ?? localizedLabel}
        </span>
        <div className={styles.meta}>
          <span
            className={styles.badge}
            style={{ background: wrapperColor, color: fontColor }}
          >
            {localizedLabel}
          </span>
        </div>
      </div>

      <div className={styles.rightContent}>
        <span
          className={styles.amount}
          style={{
            color: isNeutral ? "#b87c00" : isPositive ? "#3d995f" : "#a80b0b",
          }}
        >
          {isPositive ? "+" : "-"}
          {Math.abs(transaction.amountMinutes)}
          {t("units.m")}
        </span>
        <span className={styles.balance}>
          {t("transactions.labels.balanceAfter")}:{" "}
          {transaction.balanceAfterMinutes}
          {t("units.m")}
        </span>
      </div>
    </div>
  );
};
