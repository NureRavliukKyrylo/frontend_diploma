import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./../styles/LanguageSwitcherButton.module.scss";
import { GreatBritain, UkraineLogo, Globe } from "../../../../assets/common";

export const LanguageSwitcherButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdown}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button className={styles.langButton} aria-label="English">
              <img src={GreatBritain} alt="britain" />
            </button>
            <button className={styles.langButton} aria-label="Ukrainian">
              <img src={UkraineLogo} alt="ua" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={styles.globeButton}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-label="Open language switcher"
      >
        <img src={Globe} alt="ua" />
      </button>
    </div>
  );
};
