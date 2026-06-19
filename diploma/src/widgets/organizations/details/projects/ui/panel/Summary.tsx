import { motion } from "framer-motion";
import styles from "./Summary.module.scss";

interface ProjectsSummaryProps {
  total: number;
  active: number;
  completed: number;
}

export const ProjectsSummary = ({
  total,
  active,
  completed,
}: ProjectsSummaryProps) => {
  return (
    <motion.section
      className={styles.projectsSummarySurface}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.projectsSummaryCanvas} aria-hidden="true" />

      <div className={styles.projectsSummaryStats}>
        <article>
          <strong>{total}</strong>
          <span>All projects</span>
        </article>
        <article>
          <strong>{active}</strong>
          <span>Active projects</span>
        </article>
        <article>
          <strong>{completed}</strong>
          <span>Completed projects</span>
        </article>
      </div>
    </motion.section>
  );
};
