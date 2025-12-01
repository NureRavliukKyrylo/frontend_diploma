import styles from "./CategoryCard.module.scss";
import { Link } from "@tanstack/react-router";

interface CategoryCardProps {
  backgroundCategory: string;
  categoryName: string;
}
export const CategoryCard = ({
  backgroundCategory,
  categoryName,
}: CategoryCardProps) => {
  return (
    <Link
      to="/categories/$categoryName"
      params={{ categoryName: categoryName }}
      className={styles.categoryCardWrapper}
      style={{ backgroundImage: `url(${backgroundCategory})` }}
    >
      <div className={styles.categoryNameBlock}>
        <h1>{categoryName}</h1>
      </div>
    </Link>
  );
};
