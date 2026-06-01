import type { Category } from "@entities/category/model";
import styles from "./RelatedCategoryCard.module.scss";
import type { ReactNode } from "react";

interface RelatedCategoryCardProps {
  category: Category;
  children: ReactNode;
}
export const RelatedCategoryCard = ({
  category,
  children,
}: RelatedCategoryCardProps) => {
  return (
    <div className={styles.relatedCategoryWrapper}>
      <div className={styles.headerContent}>
        <img src={category.imageUrl} alt="category-related-item" />
        <h1>{category.name}</h1>
      </div>
      <div className={styles.footerContent}>
        <div className={styles.activitiesTotal}>
          <h1>{category.activitiesTotal}</h1>
          <h2>Activities</h2>
        </div>
        {children}
      </div>
    </div>
  );
};
