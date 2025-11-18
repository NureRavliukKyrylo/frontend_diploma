import styles from "./SkillCard.module.scss";

interface SkillCardProps {
  skillImage: string;
  skillTitle: string;
}

export const SkillCard = ({ skillImage, skillTitle }: SkillCardProps) => {
  return (
    <>
      <img
        src={skillImage}
        className={styles.skillImageCard}
        alt="skill image"
      />
      <h1 className={styles.skillTitleCard}>{skillTitle}</h1>
    </>
  );
};
