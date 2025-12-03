import type { Category } from "@entities/category";
import styles from "./CategoryTab.module.scss";
import { SelectedMark } from "@shared/assets/icons/info";

interface CategoryTabProps {
  category: Category;
  isSelected?: boolean;
  onClick?: (category: Category) => void;
}
export const CategoryTab = ({
  category,
  isSelected,
  onClick,
}: CategoryTabProps) => {
  const isClickable = !!onClick;

  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };
  return (
    <div
      className={`${styles.categoryTabBlock} ${
        isSelected ? styles.selected : ""
      } ${isClickable ? styles.clickable : ""}`}
      onClick={handleClick}
    >
      <img
        className={styles.selectedMarkImage}
        src={SelectedMark}
        alt="selected mark"
      />
      <h1 className={styles.categoryNameText}>{category.categoryName}</h1>
    </div>
  );
};
