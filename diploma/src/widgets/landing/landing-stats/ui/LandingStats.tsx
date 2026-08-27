import { motion } from "framer-motion";
import type { LandingAnimations, LandingStat } from "../../model/types";
import { CountUpNumber } from "./CountUpNumber";
import styles from "./LandingStats.module.scss";

interface LandingStatsProps {
  stats: readonly LandingStat[];
  animations: Pick<
    LandingAnimations,
    "sectionVariants" | "sectionViewport"
  >;
}

export const LandingStats = ({ stats, animations }: LandingStatsProps) => (
  <motion.section
    id="stats"
    className={styles.statsSection}
    variants={animations.sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={animations.sectionViewport}
  >
    <div className={styles.statsGrid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.statItem}>
          <p className={styles.statNumber}>
            <CountUpNumber value={stat.value} suffix={stat.suffix} />
          </p>
          <p className={styles.statLabel}>{stat.label}</p>
        </div>
      ))}
    </div>
  </motion.section>
);
