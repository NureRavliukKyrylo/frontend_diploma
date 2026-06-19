import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import styles from "./NotFoundPage.module.scss";

const particles = [
  {
    className: styles.circleParticle,
    left: "4%",
    top: "16%",
    x: 26,
    y: -28,
    rotate: 0,
    delay: 0,
  },
  {
    className: styles.rectParticle,
    left: "10%",
    top: "82%",
    x: -18,
    y: -30,
    rotate: 26,
    delay: 0.4,
  },
  {
    className: styles.circleParticle,
    left: "22%",
    top: "28%",
    x: 20,
    y: 24,
    rotate: 0,
    delay: 1,
  },
  {
    className: styles.rectParticle,
    left: "36%",
    top: "8%",
    x: -26,
    y: 18,
    rotate: -24,
    delay: 0.2,
  },
  {
    className: styles.circleParticle,
    left: "63%",
    top: "20%",
    x: 28,
    y: -24,
    rotate: 0,
    delay: 0.8,
  },
  {
    className: styles.rectParticle,
    left: "78%",
    top: "76%",
    x: -22,
    y: -28,
    rotate: 34,
    delay: 1.3,
  },
  {
    className: styles.circleParticle,
    left: "92%",
    top: "40%",
    x: -26,
    y: 18,
    rotate: 0,
    delay: 0.6,
  },
  {
    className: styles.rectParticle,
    left: "54%",
    top: "88%",
    x: 24,
    y: -24,
    rotate: -18,
    delay: 1.6,
  },
  {
    className: styles.circleParticle,
    left: "96%",
    top: "12%",
    x: -30,
    y: 28,
    rotate: 0,
    delay: 1.1,
  },
  {
    className: styles.rectParticle,
    left: "2%",
    top: "54%",
    x: 34,
    y: 18,
    rotate: -32,
    delay: 1.8,
  },
];

const pageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const floatingTransition = {
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut",
} as const;

export function NotFoundPage() {
  return (
    <main className={styles.notFoundPage} aria-labelledby="not-found-title">
      <div className={styles.watermark} aria-hidden="true">
        404
      </div>

      <div className={styles.particlesLayer} aria-hidden="true">
        {particles.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${particle.top}-${index}`}
            className={`${styles.particle} ${particle.className}`}
            style={{ left: particle.left, top: particle.top }}
            animate={{
              x: [0, particle.x, 0],
              y: [0, particle.y, 0],
              rotate: [0, particle.rotate, 0],
              opacity: [0.14, 0.28, 0.14],
            }}
            transition={{
              duration: 6 + index * 0.35,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.section
        className={styles.content}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={styles.floatingStack}
          animate={{ y: [0, -14, 0] }}
          transition={floatingTransition}
        >
          <motion.div className={styles.compassIcon} variants={itemVariants}>
            <svg
              className={styles.compassSvg}
              viewBox="0 0 120 120"
              role="img"
              aria-label="Lost compass illustration"
            >
              <circle cx="60" cy="60" r="46" className={styles.compassCircle} />
              <circle
                cx="60"
                cy="60"
                r="30"
                className={styles.compassInnerCircle}
              />
              <path
                d="M60 12V24M60 96V108M12 60H24M96 60H108"
                className={styles.compassTicks}
                strokeLinecap="round"
              />
              <motion.g
                animate={{ rotate: [0, 20, -20, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "60px 60px" }}
              >
                <path d="M60 24L72 62L60 56L48 62Z" className={styles.compassNeedle} />
                <path
                  d="M60 96L48 58L60 64L72 58Z"
                  className={styles.compassNeedleMuted}
                />
              </motion.g>
              <circle cx="60" cy="60" r="5" className={styles.compassCenter} />
            </svg>
          </motion.div>

          <motion.h1
            id="not-found-title"
            className={styles.errorCode}
            variants={itemVariants}
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div className={styles.decorLine} variants={itemVariants} />

        <motion.h2 className={styles.title} variants={itemVariants}>
          Mission Not Found
        </motion.h2>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          This volunteer went looking for a mission - and got completely lost.
          Let's get you back to where it matters.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className={styles.primaryButton}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 9.4L10 3L17 9.4V17H12.5V12H7.5V17H3V9.4Z" />
              </svg>
              Go Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/activities" className={styles.secondaryButton}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M8.8 3.4C5.8 3.4 3.4 5.8 3.4 8.8C3.4 11.8 5.8 14.2 8.8 14.2C10 14.2 11.1 13.8 12 13.1L15.4 16.5L16.6 15.3L13.2 11.9C13.8 11.1 14.2 10 14.2 8.8C14.2 5.8 11.8 3.4 8.8 3.4ZM8.8 5C10.9 5 12.6 6.7 12.6 8.8C12.6 10.9 10.9 12.6 8.8 12.6C6.7 12.6 5 10.9 5 8.8C5 6.7 6.7 5 8.8 5Z" />
              </svg>
              Browse Activities
            </Link>
          </motion.div>
        </motion.div>

        <motion.p className={styles.brandLabel} variants={itemVariants}>
          IMPACTFLOW
        </motion.p>
      </motion.section>
    </main>
  );
}
