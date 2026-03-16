import styles from "./StepSkillInfo.module.scss";
import type { StepProps } from "../../config/steps";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";

export const StepSkillInfo = ({ skill, onNext, error }: StepProps) => {
  return (
    <div className={styles.wrapperAssignSkillInfo}>
      <div className={styles.skillImageWrapper}>
        <img src={skill.iconUrl} alt="skill-image" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={styles.assignSkillForm}
      >
        <div className={styles.topContentWrapper}>
          <div className={styles.headerAssignSkillModal}>
            <h1>{skill.name}</h1>
            <p>{skill.description}</p>
          </div>
          <div className={styles.modalDivider} />
          <div className={styles.skillCategories}>
            {skill.categories.map((category) => (
              <div key={category.id} className={styles.categorySkillTab}>
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <motion.div
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={styles.assignSkillButton}
        >
          <BaseButtonWrapper
            type="button"
            onClick={onNext}
            className={styles.btn}
          >
            ADD SKILL
          </BaseButtonWrapper>
        </motion.div>
      </motion.div>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
};
