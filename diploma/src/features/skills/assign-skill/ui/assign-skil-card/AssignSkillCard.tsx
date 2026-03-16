import { AddingPlus } from "@shared/assets/icons/actions";
import styles from "./AssignSkillCard.module.scss";
import { Link } from "@tanstack/react-router";

export const AssignSkillCard = () => {
  return (
    <Link to="/skills" className={styles.assignSkillCardWapper}>
      <div className={styles.cardAssignSkillContent}>
        <div className={styles.assignSkillButton}>
          <AddingPlus />
        </div>
        <h1>NEW SKILL</h1>
      </div>
    </Link>
  );
};
