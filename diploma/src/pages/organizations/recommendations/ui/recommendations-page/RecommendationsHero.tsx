import { Sparkles, UsersRound, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./RecommendationsHero.module.scss";

interface RecommendationsHeroProps {
  totalCount: number;
  boostedCount: number;
  invitedCount: number;
}

const StatPill = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) => (
  <div className={styles.statPill}>
    <span className={accent ? styles.statValueAccent : styles.statValue}>
      {value}
    </span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

export const RecommendationsHero = ({
  totalCount,
  boostedCount,
  invitedCount,
}: RecommendationsHeroProps) => {
  const { t } = useTranslation("organizations");

  return (
    <section className={styles.hero}>
    <div className={styles.blobPrimary} />
    <div className={styles.blobSecondary} />

    <div className={styles.copy}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        <Sparkles size={14} />
        {t("recommendations.hero.smartMatching")}
      </div>
      <h1>{t("recommendations.hero.title")}</h1>
      <p>{t("recommendations.hero.subtitle")}</p>
    </div>

    <div
      className={styles.stats}
      aria-label={t("recommendations.hero.summary")}
    >
      <UsersRound size={18} />
      <StatPill
        label={t("recommendations.hero.suggested")}
        value={totalCount}
      />
      <StatPill
        label={t("recommendations.hero.boosted")}
        value={boostedCount}
        accent
      />
      <StatPill
        label={t("recommendations.hero.invited")}
        value={invitedCount}
      />
      <Zap className={styles.zap} size={17} />
    </div>
    </section>
  );
};
