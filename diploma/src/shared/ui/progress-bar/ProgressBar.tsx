import React from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  current: number;
  max?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
  const progressPercentage = max
    ? Math.min((current / max) * 100, 100)
    : current;

  return (
    <div className={styles.levelProgress}>
      <div className={styles.barContainer}>
        <div
          className={styles.barFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
