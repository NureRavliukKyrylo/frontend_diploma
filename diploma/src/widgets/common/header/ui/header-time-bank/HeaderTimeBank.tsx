import { Hourglass } from "lucide-react";
import { formatTimeBankMinutes } from "../../lib/header";
import styles from "./HeaderTimeBank.module.scss";
import { useTranslation } from "react-i18next";

interface HeaderTimeBankProps {
  availableMinutes?: number | null;
  onClick?: () => void;
}

export const HeaderTimeBank = ({
  availableMinutes,
  onClick,
}: HeaderTimeBankProps) => {
  const { t } = useTranslation("common");

  return (
    <button
      type="button"
      className={styles.timeBankBlock}
      role="menuitem"
      onClick={onClick}
    >
      <span className={styles.timeBankIcon}>
        <Hourglass aria-hidden="true" strokeWidth={1.9} />
      </span>
      <div className={styles.timeBankText}>
        <span>{t("header.timeBank")}</span>
        <span>{formatTimeBankMinutes(availableMinutes, t)}</span>
      </div>
    </button>
  );
};
