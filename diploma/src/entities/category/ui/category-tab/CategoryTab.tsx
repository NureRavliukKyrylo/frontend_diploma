import styles from "./CategoryTab.module.scss";

interface CategoryTabProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CategoryTab = ({
  name,
  isSelected,
  onClick,
  className,
}: CategoryTabProps) => {
  return (
    <div
      className={`${styles.categoryTabBlock} ${isSelected ? styles.selected : ""} ${onClick ? styles.clickable : ""}  ${className ?? ""}`}
      onClick={() => onClick?.()}
    >
      {name}
    </div>
  );
};
