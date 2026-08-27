import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type {
  LandingAnimations,
  LandingCtaContent,
} from "../../model/types";
import styles from "./LandingCta.module.scss";

interface LandingCtaProps {
  content: LandingCtaContent;
  animations: Pick<LandingAnimations, "sectionViewport">;
}

export const LandingCta = ({ content, animations }: LandingCtaProps) => (
  <motion.section
    className={styles.ctaSection}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={animations.sectionViewport}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className={styles.ctaParticles} aria-hidden="true">
      {content.particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}-${index}`}
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
    <h2>{content.title}</h2>
    <p>{content.subtitle}</p>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link to="/auth" className={styles.secondaryCta}>
        {content.button}
      </Link>
    </motion.div>
  </motion.section>
);
