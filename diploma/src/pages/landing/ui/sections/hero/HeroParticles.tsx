import { motion } from "framer-motion";
import { heroParticles } from "../../../config/landingContent";
import styles from "./HeroParticles.module.scss";

export const HeroParticles = () => (
  <div className={styles.heroParticles} aria-hidden="true">
    {heroParticles.map((particle, index) => (
      <motion.div
        key={`hero-particle-${particle.left}-${particle.top}-${index}`}
        className={`${styles.particle} ${
          particle.shape === "circle"
            ? styles.particleCircle
            : styles.particleSquare
        }`}
        style={{
          width: particle.size,
          height: particle.size,
          top: particle.top,
          left: particle.left,
          opacity: particle.opacity,
        }}
        animate={{
          x: [0, particle.driftX, 0],
          y: [0, particle.driftY, 0],
        }}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);
