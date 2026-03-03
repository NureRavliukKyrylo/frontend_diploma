import styles from "./CategoriesWidget.module.scss";
import { categoryQuery, type Category } from "@entities/category";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

interface CategoriesWidgetProps {
  renderCard: (category: Category) => React.ReactNode;
  startSlot?: React.ReactNode;
}

export const CategoriesWidget = ({
  renderCard,
  startSlot,
}: CategoriesWidgetProps) => {
  const search = useSearch({ from: "/_masterLayout/categories/" });
  const { data: categories } = useSuspenseQuery(categoryQuery.list(search, 8));

  return (
    <div className={styles.categoriesWidgetBlock}>
      {startSlot}
      {categories.data.map((category) => renderCard(category))}
    </div>
  );
};
