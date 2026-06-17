import { BaseCategoryCard } from "../base/BaseCategoryCard";
import styles from "./AllCategoriesCard.module.scss";
import { LayoutCard } from "@shared/assets/images/layout";
import { useTranslation } from "react-i18next";

export const AllCategoriesCard = () => {
  const { t } = useTranslation(["category"]);

  return (
    <BaseCategoryCard
      img={LayoutCard}
      imgAlt={t("category:labels.imgAltLayout")}
      className={styles.allCategoriesWrapper}
    >
      <div className={styles.titleCategories}>
        <div className={styles.textGroup}>
          <h1>{t("category:labels.all")}</h1>
          <h2>{t("category:labels.categories")}</h2>
        </div>
      </div>
    </BaseCategoryCard>
  );
};
