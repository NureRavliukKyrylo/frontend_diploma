import AddRounded from "@mui/icons-material/AddRounded";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./CreateCard.module.scss";

interface CreateCardProps {
  organizationName: string;
}

export const CreateCard = ({ organizationName }: CreateCardProps) => {
  const { t } = useTranslation("organizations");
  return (
    <motion.article
      className={styles.taskCreateRow}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.34,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.taskContent}>
        <div className={styles.taskHeader}>
          <div className={styles.taskIntro}>
            <h3>{t("details.tasks.create")}</h3>
          </div>

          <span className={styles.taskCreateIcon} aria-hidden="true">
            <AddRounded />
          </span>
        </div>

        <p className={styles.taskDescription}>
          {t("details.tasks.createText", { name: organizationName })}
        </p>
      </div>
    </motion.article>
  );
};
