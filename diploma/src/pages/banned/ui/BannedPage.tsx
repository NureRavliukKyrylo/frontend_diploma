import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BannedHero, BannedIllustration } from "@widgets/banned";
import styles from "./BannedPage.module.scss";

const particles = [
  { size: 8, top: "18%", left: "12%", delay: 0 },
  { size: 5, top: "65%", left: "8%", delay: 2 },
  { size: 6, top: "30%", left: "88%", delay: 1 },
  { size: 10, top: "75%", left: "90%", delay: 3 },
  { size: 4, top: "45%", left: "5%", delay: 4 },
];

export const BannedPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.logoWrapper}>
        <Link className={styles.logo} to="/" aria-label="ImpactFlow home">
          IMPACTFLOW
        </Link>
      </div>

      <motion.div
        className={styles.watermark}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        BANNED
      </motion.div>

      {particles.map((particle, index) => (
        <motion.div
          key={`${particle.top}-${particle.left}-${index}`}
          className={styles.particle}
          style={{
            width: particle.size,
            height: particle.size,
            top: particle.top,
            left: particle.left,
          }}
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          aria-hidden="true"
        />
      ))}

      <div className={styles.content}>
        <BannedHero />
        <BannedIllustration />
      </div>
    </main>
  );
};
