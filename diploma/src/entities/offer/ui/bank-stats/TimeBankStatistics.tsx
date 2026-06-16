import type { TimeBankStats } from "@entities/user/profile";
import styles from "./TimeBankStatistics.module.scss";
import { TimeBankIcon } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";

interface TimeBankStatisticsProps {
  statistics?: TimeBankStats;
}

export const TimeBankStatistics = ({ statistics }: TimeBankStatisticsProps) => {
  const { t } = useTranslation("timeBank");

  return (
    <div className={styles.wrapper}>
      <div className={styles.balance}>
        <h1>{t("overview.balance.label")}</h1>
        <div className={styles.value}>
          <TimeBankIcon className={styles.timeBankIcon} />
          <h2>
            {t("overview.balance.minutes", {
              count: statistics?.balanceMinutes ?? 0,
            })}
          </h2>
        </div>
      </div>
      <div className={styles.typeMinutes}>
        <div className={styles.reserved}>
          <h1>{t("overview.balance.reserved")}</h1>
          <h2>
            {statistics?.reservedMinutes ?? 0} {t("units.m")}
          </h2>
        </div>
        <div className={styles.dividerLine} />
        <div className={styles.available}>
          <h1>{t("overview.balance.available")}</h1>
          <h2>
            {statistics?.balanceMinutes ?? 0} {t("units.m")}
          </h2>
        </div>
      </div>
    </div>
  );
};
