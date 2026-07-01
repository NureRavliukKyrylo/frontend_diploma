import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { RecommendationScoreBreakdown } from "@entities/recommendation";
import styles from "./MatchBreakdown.module.scss";

const breakdownRows: Array<{
  key: keyof RecommendationScoreBreakdown;
  labelKey: string;
  max: number;
}> = [
  {
    key: "skillCategoryMatch",
    labelKey: "recommendations.breakdown.skills",
    max: 35,
  },
  {
    key: "availabilityFit",
    labelKey: "recommendations.breakdown.availability",
    max: 20,
  },
  {
    key: "locationFit",
    labelKey: "recommendations.breakdown.location",
    max: 15,
  },
  {
    key: "ratingReliability",
    labelKey: "recommendations.breakdown.reliability",
    max: 15,
  },
];

export const MatchBreakdown = ({
  breakdown,
}: {
  breakdown: RecommendationScoreBreakdown;
}) => {
  const { t } = useTranslation("organizations");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.breakdown}>
      <button
        type="button"
        className={styles.breakdownToggle}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        {isOpen
          ? t("recommendations.breakdown.hide")
          : t("recommendations.breakdown.title")}
        <ChevronDown
          size={17}
          className={isOpen ? styles.chevronOpen : styles.chevron}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.breakdownPanel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.breakdownInner}>
              {breakdownRows.map((row, index) => {
                const value = Math.max(
                  0,
                  Math.min(100, (breakdown[row.key] / row.max) * 100),
                );

                return (
                  <div key={row.key} className={styles.breakdownRow}>
                    <div className={styles.breakdownLabel}>
                      <span>{t(row.labelKey)}</span>
                      <span>{Math.round(value)}%</span>
                    </div>
                    <div className={styles.breakdownTrack}>
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
