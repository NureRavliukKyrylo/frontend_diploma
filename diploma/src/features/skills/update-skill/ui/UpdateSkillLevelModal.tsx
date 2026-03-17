import {
  SkillLevelType,
  type SkillLevel,
  type SkillProfile,
} from "@entities/skill";
import styles from "./UpdateSkillLevelModal.module.scss";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useUpdateSkill } from "../model/useUpdateSkill";
import { BaseModal } from "@shared/ui/modals";

interface UpdateSkillLevelModalProps {
  skill: SkillProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateSkillLevelModal = ({
  isOpen,
  onClose,
  skill,
}: UpdateSkillLevelModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const { errorMessage, formik, mutation, isLoading } = useUpdateSkill(
    skill.skillId,
    skill.level,
    handleClose,
  );
  const skillLevelTabs = Object.entries(SkillLevelType) as [
    string,
    SkillLevel,
  ][];
  const levelLabel = Object.keys(SkillLevelType).find(
    (key) =>
      SkillLevelType[key as keyof typeof SkillLevelType] ===
      formik.values.level,
  );

  return (
    <BaseModal isOpen={isOpen} maxWidth="900px" onClose={handleClose}>
      <form
        className={styles.wrapperUpdateSkillInfo}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.skillImageWrapper}>
          <img src={skill.iconUrl} alt="skill-image" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={styles.updateSkillForm}
        >
          <div className={styles.topContentWrapper}>
            <div className={styles.headerUpdateSkillModal}>
              <h1>{skill.name}</h1>
              <p>{skill.description}</p>
            </div>
            <div className={styles.modalDivider} />
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
          </div>
          <motion.div
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={styles.updateSkillButton}
          >
            <BaseButtonWrapper
              type="submit"
              className={styles.btn}
              loading={isLoading}
            >
              UPDATE TO {levelLabel?.toUpperCase()}
            </BaseButtonWrapper>
          </motion.div>
        </motion.div>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      </form>
    </BaseModal>
  );
};
