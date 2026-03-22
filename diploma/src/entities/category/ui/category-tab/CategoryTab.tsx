import styles from "./CategoryTab.module.scss";

interface CategoryTabProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryTab = ({
  name,
  isSelected,
  onClick,
}: CategoryTabProps) => {
  return (
    <div
      className={`${styles.categoryTabBlock} ${isSelected ? styles.selected : ""} ${onClick ? styles.clickable : ""}`}
      onClick={() => onClick?.()}
    >
      <h1 className={styles.categoryNameText}>{name}</h1>
    </div>
  );
};
