import { Link, useRouter } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Home, LockKeyhole, MapPin } from "lucide-react";
import styles from "./ForbiddenPage.module.scss";

const particles = [
  { className: styles.circleParticle, left: "5%", top: "16%", x: 28, y: -22, rotate: 0, delay: 0 },
  { className: styles.rectParticle, left: "13%", top: "78%", x: -22, y: -28, rotate: 28, delay: 0.4 },
  { className: styles.circleParticle, left: "25%", top: "34%", x: 18, y: 24, rotate: 0, delay: 0.9 },
  { className: styles.rectParticle, left: "42%", top: "10%", x: -30, y: 18, rotate: -24, delay: 0.2 },
  { className: styles.circleParticle, left: "62%", top: "86%", x: 24, y: -26, rotate: 0, delay: 1.2 },
  { className: styles.rectParticle, left: "76%", top: "20%", x: -20, y: 26, rotate: 34, delay: 0.7 },
  { className: styles.circleParticle, left: "91%", top: "46%", x: -28, y: -18, rotate: 0, delay: 1.4 },
  { className: styles.rectParticle, left: "88%", top: "82%", x: 18, y: -30, rotate: -18, delay: 1.8 },
];

const pulseLayers = [
  { className: styles.zonePulseStrong, delay: 0 },
  { className: styles.zonePulseMedium, delay: 0.8 },
  { className: styles.zonePulseSoft, delay: 1.6 },
];

const pageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function ForbiddenPage() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }

    router.navigate({ to: "/" });
  };

  return (
    <main className={styles.forbiddenPage} aria-labelledby="forbidden-title">
      <div className={styles.watermark} aria-hidden="true">
        403
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
              opacity: [0.07, 0.2, 0.07],
            }}
            transition={{
              duration: 6.4 + index * 0.35,
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
        <section className={styles.leftColumn}>
          <motion.p className={styles.errorCode} variants={itemVariants}>
            403
          </motion.p>
          <motion.div className={styles.decorLine} variants={itemVariants} />
          <motion.h1
            id="forbidden-title"
            className={styles.title}
            variants={itemVariants}
          >
            Access Denied
          </motion.h1>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            This area is marked as a{" "}
            <strong>
              <em>restricted zone</em>
            </strong>
            . You don't have clearance to enter this mission territory.
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className={styles.primaryButton}>
                <Home size={16} strokeWidth={2.4} aria-hidden="true" />
                Go Home
              </Link>
            </motion.div>

            <motion.button
              type="button"
              className={styles.secondaryButton}
              onClick={handleGoBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" />
              Go Back
            </motion.button>
          </motion.div>

          <motion.p className={styles.brandLabel} variants={itemVariants}>
            IMPACTFLOW
          </motion.p>
        </section>

        <motion.section
          className={styles.rightColumn}
          variants={itemVariants}
          aria-label="Restricted mission territory map"
        >
          <div className={styles.mapCircle}>
            <div className={styles.mapGrid} aria-hidden="true" />
            <svg
              className={styles.mapArtwork}
              viewBox="0 0 280 280"
              aria-hidden="true"
            >
              <path
                d="M28 95C74 56 107 106 144 76C181 47 211 71 248 44"
                className={styles.mapPath}
              />
              <path
                d="M36 202C80 159 113 216 152 181C188 149 208 188 246 153"
                className={styles.mapPathMuted}
              />
              <rect x="46" y="136" width="52" height="35" rx="6" className={styles.building} />
              <rect x="188" y="92" width="48" height="42" rx="6" className={styles.building} />
              <circle cx="86" cy="86" r="5" className={styles.locationDot} />
              <circle cx="214" cy="196" r="5" className={styles.locationDot} />
            </svg>

            {pulseLayers.map((layer) => (
              <motion.span
                key={layer.className}
                className={`${styles.zonePulse} ${layer.className}`}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 3.4, opacity: 0 }}
                transition={{
                  duration: 2.5,
                  delay: layer.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                aria-hidden="true"
              />
            ))}

            <motion.div
              className={styles.restrictedZone}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              aria-hidden="true"
            />
            <div className={styles.lockBadge} aria-hidden="true">
              <LockKeyhole size={24} strokeWidth={2.4} />
            </div>

            <motion.div
              className={`${styles.mapPin} ${styles.bottomLeftPin}`}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <MapPin size={22} strokeWidth={2.2} />
            </motion.div>
            <motion.div
              className={`${styles.mapPin} ${styles.topRightPin}`}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                delay: 0.45,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              <MapPin size={20} strokeWidth={2.2} />
            </motion.div>
          </div>
        </motion.section>
      </motion.section>
    </main>
  );
}
