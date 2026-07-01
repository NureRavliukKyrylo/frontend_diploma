import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Avatar } from "@shared/ui/avatar/avatar-base/Avatar";
import styles from "./ScoreRing.module.scss";

interface ScoreRingProps {
  score: number;
  avatarUrl: string | null;
  displayName: string;
}

export const ScoreRing = ({
  score,
  avatarUrl,
  displayName,
}: ScoreRingProps) => {
  const { t } = useTranslation("organizations");
  const size = 96;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.max(0, Math.min(100, score));
  const scoreColor = normalizedScore >= 85 ? "#1a7a45" : "#1a1a1a";
  const targetOffset = circumference * (1 - normalizedScore / 100);

  return (
    <div className={styles.scoreWrap}>
      <div className={styles.scoreRing} style={{ width: size, height: size }}>
        <svg
          className={styles.scoreSvg}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          <circle
            className={styles.scoreTrack}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <motion.circle
            className={styles.scoreProgress}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <Avatar
          src={avatarUrl ?? undefined}
          fallback={displayName}
          variant="initials"
          className={styles.avatar}
          initialsClassName={styles.avatarInitials}
        />
      </div>
      <span
        className={styles.scorePill}
        style={{
          color: scoreColor,
          boxShadow:
            normalizedScore >= 85
              ? "0 2px 8px rgba(26, 122, 69, 0.28)"
              : "0 2px 8px rgba(0, 0, 0, 0.25)",
        }}
      >
        {t("recommendations.card.match", {
          score: Math.round(normalizedScore),
        })}
      </span>
    </div>
  );
};
