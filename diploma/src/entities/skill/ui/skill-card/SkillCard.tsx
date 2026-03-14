import styles from "./SkillCard.module.scss";

interface SkillCardProps {
  image: string;
  title: string;
}

export const SkillCard = ({ image, title }: SkillCardProps) => {
  return (
    <div className={styles.skillCardWrapper}>
      <img src={image} className={styles.skillImageCard} alt="skill image" />
      <h1 className={styles.skillTitleCard}>{title}</h1>
    </div>
  );
};
