import AddRounded from "@mui/icons-material/AddRounded";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import cardStyles from "../Card.module.scss";
import styles from "./CreateCard.module.scss";

interface ProjectCreateCardProps {
  organizationName: string;
  onCreateProject?: () => void;
}

export const ProjectCreateCard = ({
  organizationName,
  onCreateProject,
}: ProjectCreateCardProps) => {
  const { t } = useTranslation("organizations");
  return (
    <motion.button
      type="button"
      className={`${cardStyles.projectCard} ${styles.projectCreateCard}`}
      variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      onClick={onCreateProject}
      aria-label={t("details.projects.create")}
    >
      <div className={styles.projectCreateTop}>
        <span className={styles.projectCreateIcon} aria-hidden="true">
          <AddRounded />
        </span>
      </div>

      <div className={styles.projectCreateBody}>
        <h3>{t("details.projects.create")}</h3>
        <p>{t("details.projects.createText", { name: organizationName })}</p>
      </div>
    </motion.button>
  );
};
