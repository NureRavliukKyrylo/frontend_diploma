import type { TimeBankStats } from "@entities/user/profile";
import styles from "./TimeBankStatistics.module.scss";
import { TimeBankIcon } from "@shared/assets/icons/info";

interface TimeBankStatisticsProps {
  statistics?: TimeBankStats;
}
export const TimeBankStatistics = ({ statistics }: TimeBankStatisticsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.balance}>
        <h1>Your balance</h1>
        <div className={styles.value}>
          <TimeBankIcon className={styles.timeBankIcon} />
          <h2>{statistics?.balanceMinutes}m</h2>
        </div>
      </div>
      <div className={styles.typeMinutes}>
        <div className={styles.reserved}>
          <h1>Reserved</h1>
          <h2>{statistics?.reservedMinutes}m</h2>
        </div>
        <div className={styles.dividerLine} />
        <div className={styles.available}>
          <h1>Available</h1>
          <h2>{statistics?.reservedMinutes}m</h2>
        </div>
      </div>
    </div>
  );
};
