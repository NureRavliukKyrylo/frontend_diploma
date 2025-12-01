import styles from "./CategoriesWidget.module.scss";
import { type Category } from "@entities/category";
import { CategoryCard } from "@entities/category";

interface CategoriesWidgetProps {
  categories: Category[];
}

export const CategoriesWidget = ({ categories }: CategoriesWidgetProps) => {
  return (
    <div className={styles.categoriesWidgetBlock}>
      {categories.map((category) => (
        <CategoryCard
          key={category.categoryName}
          backgroundCategory={category.categoryBackground}
          categoryName={category.categoryName}
        />
      ))}
    </div>
  );
};
