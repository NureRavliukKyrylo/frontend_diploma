import { motion } from "framer-motion";
import { stats } from "../../config/landingContent";
import { sectionVariants, sectionViewport } from "../../lib/animations";
import { CountUpNumber } from "../CountUpNumber";
import styles from "./StatsSection.module.scss";

export const StatsSection = () => (
  <motion.section
    id="stats"
    className={styles.statsSection}
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
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
