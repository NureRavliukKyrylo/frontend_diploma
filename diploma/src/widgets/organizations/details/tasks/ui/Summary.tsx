import { motion } from "framer-motion";
import styles from "./Summary.module.scss";

interface SummaryProps {
  total: number;
  inProgress: number;
  completed: number;
}

export const Summary = ({ total, inProgress, completed }: SummaryProps) => {
  return (
    <motion.section
      className={styles.tasksSummarySurface}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.tasksSummaryCanvas} aria-hidden="true" />

      <div className={styles.tasksSummaryStats}>
        <article>
          <strong>{total}</strong>
          <span>All tasks</span>
        </article>
        <article>
          <strong>{inProgress}</strong>
          <span>In progress</span>
        </article>
        <article>
          <strong>{completed}</strong>
          <span>Completed</span>
        </article>
      </div>
    </motion.section>
  );
};
