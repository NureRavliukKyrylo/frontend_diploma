import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ctaParticles } from "../../config/landingContent";
import { sectionViewport } from "../../lib/animations";
import styles from "./CtaSection.module.scss";

export const CtaSection = () => (
  <motion.section
    className={styles.ctaSection}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={sectionViewport}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className={styles.ctaParticles} aria-hidden="true">
      {ctaParticles.map((particle, index) => (
        <motion.span
          key={`cta-particle-${particle.left}-${particle.top}-${index}`}
          style={{ left: particle.left, top: particle.top }}
          animate={{
            x: [0, particle.x, 0],
            y: [0, particle.y, 0],
            opacity: [0.05, 0.14, 0.05],
          }}
          transition={{
            duration: 5 + index * 0.4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    <h2>Ready to start your first mission?</h2>
    <p>Join thousands of volunteers already making an impact</p>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link to="/auth" className={styles.secondaryCta}>
        Join ImpactFlow
      </Link>
    </motion.div>
  </motion.section>
);
