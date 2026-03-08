import styles from "./ListProjectCard.module.scss";

export interface ListProjectCardProps {
  name: string;
}

export const ListProjectCard = ({ name }: ListProjectCardProps) => {
  return (
    <div className={styles.listCardProjectWrapper}>
      <h1>{name}</h1>
      <h2>project</h2>
    </div>
  );
};
