import { Clock3, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { RecommendationScoreBreakdown } from "@entities/recommendation";
import styles from "./RecommendationSignals.module.scss";

export const RecommendationSignals = ({
  breakdown,
}: {
  breakdown: RecommendationScoreBreakdown;
}) => {
  const { t } = useTranslation("organizations");
  const hasReliabilitySignal = breakdown.ratingReliability >= 10;
  const hasAvailabilitySignal = breakdown.availabilityFit >= 15;

  if (!hasReliabilitySignal && !hasAvailabilitySignal) return null;

  return (
    <div
      className={styles.signals}
      aria-label={t("recommendations.signals.label")}
    >
      {hasReliabilitySignal && (
        <span
          className={`${styles.signal} ${styles.reliability}`}
          title={t("recommendations.signals.reliability")}
        >
          <ShieldCheck size={14} />
        </span>
      )}
      {hasAvailabilitySignal && (
        <span
          className={`${styles.signal} ${styles.availability}`}
          title={t("recommendations.signals.availability")}
        >
          <Clock3 size={14} />
        </span>
      )}
    </div>
  );
};
