import { motion } from "framer-motion";
import styles from "./PrivacyHero.module.scss";

export const PrivacyHero = () => (
  <motion.section
    className={styles.hero}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className={styles.left}>
      <div className={styles.eyebrow}>
        <motion.div
          className={styles.eyebrowLine}
          initial={{ width: 0 }}
          animate={{ width: 24 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        />
        <span className={styles.eyebrowText}>Privacy</span>
      </div>

      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
      >
        Privacy Policy
      </motion.h1>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
      >
        We respect your privacy and are committed to protecting your personal
        data. This policy explains what we collect, why, and how you can control
        it.
      </motion.p>
    </div>

    <motion.div
      className={styles.deco}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 0.13, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 340 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 90 Q90 28 170 90 Q250 152 330 90"
          stroke="#840000"
          strokeWidth="2.4"
          fill="none"
        />
        <path
          d="M10 70 Q90 8 170 70 Q250 132 330 70"
          stroke="#840000"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M10 110 Q90 48 170 110 Q250 172 330 110"
          stroke="#840000"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M10 50 Q90 0 170 50 Q250 100 330 50"
          stroke="#840000"
          strokeWidth="1.2"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M10 130 Q90 68 170 130 Q250 192 330 130"
          stroke="#840000"
          strokeWidth="1.2"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M10 30 Q90 0 170 30 Q250 62 330 30"
          stroke="#840000"
          strokeWidth="0.8"
          fill="none"
          opacity="0.28"
        />
        <path
          d="M10 150 Q90 90 170 150 Q250 210 330 150"
          stroke="#840000"
          strokeWidth="0.8"
          fill="none"
          opacity="0.28"
        />
        <circle cx="170" cy="90" r="9" fill="#840000" opacity="0.08" />
        <circle
          cx="170"
          cy="90"
          r="24"
          stroke="#840000"
          strokeWidth="1.2"
          fill="none"
          opacity="0.06"
        />
        <circle
          cx="170"
          cy="90"
          r="44"
          stroke="#840000"
          strokeWidth="0.8"
          fill="none"
          opacity="0.035"
        />
      </svg>
    </motion.div>
  </motion.section>
);
