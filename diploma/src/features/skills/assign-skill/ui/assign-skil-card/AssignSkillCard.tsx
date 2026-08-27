import { AddingPlus } from "@shared/assets/icons/actions";
import styles from "./AssignSkillCard.module.scss";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const AssignSkillCard = () => {
  const { t } = useTranslation("skill");
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ height: "100%" }}
    >
      <Link to="/skills" className={styles.assignSkillCardWapper}>
        <div className={styles.cardAssignSkillContent}>
          <div className={styles.assignSkillButton}>
            <AddingPlus />
          </div>
          <h1>{t("skills.assignCard.title")}</h1>
        </div>
      </Link>
    </motion.div>
  );
};
