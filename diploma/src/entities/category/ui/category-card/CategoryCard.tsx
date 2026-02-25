import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  categoryName: string;
}

export const CategoryCard = ({ categoryName }: CategoryCardProps) => {
  return (
    <div className={styles.categoryNameBlock}>
      <h1>{categoryName}</h1>
    </div>
  );
};
