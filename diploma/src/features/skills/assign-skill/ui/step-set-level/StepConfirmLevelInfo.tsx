import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./StepConfirmLevelInfo.module.scss";
import {
  getSkillLevelTranslations,
  SkillLevelType,
  type SkillLevel,
} from "@entities/skill";
import type { StepProps } from "../../config/steps";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";

export const StepConfirmLevelInfo = ({
  skill,
  formik,
  onSubmit,
  isLoading,
  error,
}: StepProps) => {
  const { t } = useTranslation("skill");
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
          <h1>{t("skills.stepConfirmLevel.title")}</h1>
          <Trans
            i18nKey="skills.stepConfirmLevel.description"
            ns="skill"
            values={{ name: skill.name }}
            components={{ strong: <strong /> }}
          />
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
                {getSkillLevelTranslations(t, label)}
              </motion.div>
            ))}
          </div>
          <motion.div
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={styles.assignSkillLevelButton}
          >
            <BaseButtonWrapper
              type="submit"
              loading={isLoading}
              className={styles.btn}
            >
              {t("skills.stepConfirmLevel.addButton")}
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </form>
      {error && <div className="errorMessage">{error}</div>}
    </motion.div>
  );
};
