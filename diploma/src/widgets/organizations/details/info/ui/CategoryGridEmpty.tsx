import { motion, type Variants } from "framer-motion";
import { Grid3X3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridEmptyProps {
  containerVariants: Variants;
}

export const CategoryGridEmpty = ({
  containerVariants,
}: CategoryGridEmptyProps) => {
  const { t } = useTranslation("organizations");

  return (
    <motion.section
    className={styles.categorySection}
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className={styles.statusCard}>
      <div className={styles.statusIcon}>
        <Grid3X3 aria-hidden="true" />
      </div>
      <div className={styles.statusText}>
        <h4>{t("details.categoryGrid.emptyTitle")}</h4>
        <p>{t("details.categoryGrid.emptyText")}</p>
      </div>
    </div>
    </motion.section>
  );
};
