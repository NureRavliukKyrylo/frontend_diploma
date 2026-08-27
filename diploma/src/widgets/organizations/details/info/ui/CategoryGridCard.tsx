import { motion, type TargetAndTransition } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OrganizationCategoryCarouselItem } from "../model/categoryCarouselTypes";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridCardProps {
  category: OrganizationCategoryCarouselItem;
  subtleHover?: TargetAndTransition;
  buttonHover: TargetAndTransition;
  prefersReducedMotion: boolean;
}

export const CategoryGridCard = ({
  category,
  subtleHover,
  buttonHover,
  prefersReducedMotion,
}: CategoryGridCardProps) => {
  const { t, i18n } = useTranslation("organizations");
  const intlLocale =
    i18n.language === "uk" || i18n.language === "ua" ? "uk-UA" : "en-US";

  return (
    <motion.article
    className={styles.categoryCard}
    whileHover={subtleHover}
  >
    <div
      className={`${styles.categoryVisual} ${styles[`tone${category.tone}`]}`}
      aria-hidden="true"
    >
      {category.imageSrc ? (
        <img
          src={category.imageSrc}
          alt=""
          className={styles.categoryPreviewImage}
        />
      ) : (
        <div className={styles.categoryIcon}>
          {category.title.charAt(0) || "C"}
        </div>
      )}
    </div>

    <div className={styles.categoryBody}>
      <h4>{category.title}</h4>
    </div>

    <div className={styles.categoryFooter}>
      <div className={styles.categoryStats}>
        <div className={styles.categoryStat}>
          <strong>{category.totalActivities.toLocaleString(intlLocale)}</strong>
          <span>{t("details.categoryGrid.allActivities")}</span>
        </div>
        <div className={styles.categoryStat}>
          <strong>{category.activeActivities.toLocaleString(intlLocale)}</strong>
          <span>{t("details.categoryGrid.activeActivities")}</span>
        </div>
      </div>

      <motion.button
        type="button"
        className={styles.categoryAction}
        aria-label={category.title}
        whileHover={prefersReducedMotion ? undefined : buttonHover}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      >
        <ArrowRight aria-hidden="true" />
      </motion.button>
    </div>
    </motion.article>
  );
};
