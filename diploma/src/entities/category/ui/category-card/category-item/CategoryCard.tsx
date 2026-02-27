import { BaseCategoryCard } from "../base/BaseCategoryCard";
import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  name: string;
  background: string;
}

export const CategoryCard = ({ name, background }: CategoryCardProps) => {
  return (
    <BaseCategoryCard
      img={background}
      imgAlt="category-background"
      className={styles.categoryCardWrapper}
    >
      <div className={styles.categoryNameBlock}>
        <h1>{name}</h1>
      </div>
    </BaseCategoryCard>
  );
};
