import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./Summary.module.scss";

interface SummaryProps {
  total: number;
  inProgress: number;
  completed: number;
}

export const Summary = ({ total, inProgress, completed }: SummaryProps) => {
  const { t } = useTranslation("organizations");
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
          <span>{t("details.tasks.all")}</span>
        </article>
        <article>
          <strong>{inProgress}</strong>
          <span>{t("details.tasks.inProgress")}</span>
        </article>
        <article>
          <strong>{completed}</strong>
          <span>{t("details.tasks.completed")}</span>
        </article>
      </div>
    </motion.section>
  );
};
