import { IconShieldPause } from "@tabler/icons-react";
import { motion } from "framer-motion";
import styles from "./BannedIllustration.module.scss";

export const BannedIllustration = () => {
  return (
    <motion.section
      className={styles.right}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Suspended account status"
    >
      <motion.div
        className={styles.ringOuter}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <div className={styles.ringInner} aria-hidden="true" />
      <div className={styles.iconWrap}>
        <IconShieldPause size={64} strokeWidth={1.8} />
      </div>
    </motion.section>
  );
};
