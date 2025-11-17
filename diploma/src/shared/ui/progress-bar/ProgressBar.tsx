import React from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  currentXP: number;
  maxXP: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentXP,
  maxXP,
}) => {
  const progressPercentage = Math.min((currentXP / maxXP) * 100, 100);

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
