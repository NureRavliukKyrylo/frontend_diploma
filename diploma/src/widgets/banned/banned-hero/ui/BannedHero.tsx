import { IconLogout, IconMessage2 } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BannedInfoCard } from "../../banned-info-card";
import styles from "./BannedHero.module.scss";

export const BannedHero = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className={styles.left}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h1 className={styles.heading}>
        Your mission
        <br />
        has been <span className={styles.headingAccent}>paused</span>
      </h1>
      <p className={styles.description}>
        Your account has been suspended for violating our community guidelines.
        Most suspensions are temporary — review the details below or appeal if
        you believe this was a mistake.
      </p>

      <BannedInfoCard />

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
      >
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => {}}
        >
          <IconMessage2 size={18} strokeWidth={2.2} />
          Submit an appeal
        </button>
        <button
          type="button"
          className={styles.btnOutline}
          onClick={() => navigate({ to: "/auth" })}
        >
          <IconLogout size={18} strokeWidth={2.2} />
          Sign out
        </button>
      </motion.div>
    </motion.section>
  );
};
