import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./StepConfirmLevelInfo.module.scss";
import { SkillLevelType, type SkillLevel } from "@entities/skill";
import type { StepProps } from "../../config/steps";
import { Arrow } from "@shared/assets/icons/actions";
import { motion } from "framer-motion";

export const StepConfirmLevelInfo = ({
  skill,
  formik,
  onSubmit,
  isLoading,
  error,
}: StepProps) => {
  const skillLevelTabs = Object.entries(SkillLevelType) as [
    string,
    SkillLevel,
  ][];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={styles.wrapperSetLevel}
    >
      <form className={styles.formSetLevel} onSubmit={onSubmit}>
        <div className={styles.levelSkillInfo}>
          <h1>SKILL LEVEL</h1>
          <p>
            Choose how well you know <strong>{skill.name}</strong> — from just
            starting out to fully mastered.
          </p>
        </div>
        <div className={styles.skillsLevelbuttonWrapper}>
          <div className={styles.skillsLevelsListWrapper}>
            {skillLevelTabs.map(([label, value]) => (
              <motion.div
                layout
                key={value}
                className={`${styles.levelTab} ${formik.values.level === value ? styles.active : ""}`}
                onClick={() => formik.setFieldValue("level", value)}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
          <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={styles.assignSkillLevelButton}
          >
            <BaseButtonWrapper
              type="submit"
              disabled={isLoading}
              className={styles.btn}
            >
              <img src={Arrow} alt="arrow-icon" />
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </form>
      {error && <div className="errorMessage">{error}</div>}
    </motion.div>
  );
};
