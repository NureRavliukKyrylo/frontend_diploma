import styles from "./CategoryTab.module.scss";
import { SelectedMark } from "@shared/assets/icons/info";

interface CategoryTabProps {
  categoryName: string;
  isSelected?: boolean;
  onClick?: (categoryName: string) => void;
}

export const CategoryTab = ({
  categoryName,
  isSelected,
  onClick,
}: CategoryTabProps) => {
  return (
    <div
      className={`${styles.categoryTabBlock} ${isSelected ? styles.selected : ""} ${onClick ? styles.clickable : ""}`}
      onClick={() => onClick?.(categoryName)}
    >
      <img
        className={styles.selectedMarkImage}
        src={SelectedMark}
        alt="selected mark"
      />
      <h1 className={styles.categoryNameText}>{categoryName}</h1>
    </div>
  );
};
