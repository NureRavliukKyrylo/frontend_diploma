import { BaseCategoryCard } from "../base/BaseCategoryCard";
import styles from "./AllCategoriesCard.module.scss";
import { LayoutCard } from "@shared/assets/images/layout";

export const AllCategoriesCard = () => {
  return (
    <BaseCategoryCard
      img={LayoutCard}
      imgAlt="layout"
      className={styles.allCategoriesWrapper}
    >
      <div className={styles.titleCategories}>
        <div className={styles.textGroup}>
          <h1>ALL</h1>
          <h2>CATEGORIES</h2>
        </div>
      </div>
    </BaseCategoryCard>
  );
};
