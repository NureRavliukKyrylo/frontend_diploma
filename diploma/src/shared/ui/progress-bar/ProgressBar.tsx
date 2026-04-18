import React from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  current: number;
  max?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  className = "",
}) => {
  const progressPercentage = max
    ? Math.min((current / max) * 100, 100)
    : current;

  return (
    <div className={styles.levelProgress}>
      <div className={`${styles.barContainer} ${className}`}>
        <div
          className={styles.barFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
