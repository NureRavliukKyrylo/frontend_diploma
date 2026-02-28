import styles from "./CategoryTab.module.scss";

interface CategoryTabProps {
  name: string;
  isSelected?: boolean;
  onClick?: (name: string) => void;
}

//TODO: make this card universal to shared/ui later
export const CategoryTab = ({
  name,
  isSelected,
  onClick,
}: CategoryTabProps) => {
  return (
    <div
      className={`${styles.categoryTabBlock} ${isSelected ? styles.selected : ""} ${onClick ? styles.clickable : ""}`}
      onClick={() => onClick?.(name)}
    >
      <h1 className={styles.categoryNameText}>{name}</h1>
    </div>
  );
};
