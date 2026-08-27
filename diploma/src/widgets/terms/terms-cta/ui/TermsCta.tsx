import { motion } from "framer-motion";
import { IconMail } from "@tabler/icons-react";
import styles from "./TermsCta.module.scss";

export const TermsCta = () => (
  <motion.section
    className={styles.cta}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <div>
      <p className={styles.eyebrow}>Questions?</p>
      <h2 className={styles.title}>Need clarification on these terms?</h2>
      <p className={styles.sub}>
        Our legal team responds within 5 business days.
      </p>
    </div>

    <motion.a
      className={styles.btn}
      href="mailto:legal@impactflow.org"
      whileTap={{ scale: 0.97 }}
    >
      <IconMail size={20} aria-hidden="true" />
      Contact legal team
    </motion.a>
  </motion.section>
);
