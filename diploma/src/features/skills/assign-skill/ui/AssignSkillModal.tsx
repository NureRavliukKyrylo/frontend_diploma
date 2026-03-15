import { BaseModal } from "@shared/ui/modals";
import { useAssignSkill } from "../model/useAssignSkill";
import styles from "./AssignSkillModal.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { SkillLevelType, type SkillLevel } from "@entities/skill";

interface AssignSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillId: string;
}

export const AssingSkillModal = ({
  isOpen,
  onClose,
  skillId,
}: AssignSkillModalProps) => {
  const { errorMessage, handleSubmit, formik, isLoading } =
    useAssignSkill(skillId);

  const skillLevelTabs = Object.entries(SkillLevelType) as [
    string,
    SkillLevel,
  ][];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      error={errorMessage}
      maxWidth="900"
      showClosed={true}
    >
      <form className={styles.assignSkillForm} onSubmit={handleSubmit}>
        <div className={styles.headerAssignSkillModal}>
          <h1>Ad Campaign Creator</h1>
          <p>
            The ability to create effective ad campaigns with clear messaging,
            strong audience focus, and strategic thinking
          </p>
        </div>
        <div className={styles.setSkillLevel}>
          <h1>LEVEL</h1>
          <p>Set your current proficiency level for this skill.</p>
          {skillLevelTabs.map(([label, value]) => (
            <div
              key={value}
              className={`${styles.levelTab} ${
                formik.values.level === value ? styles.active : ""
              }`}
              onClick={() => formik.setFieldValue("level", value)}
            >
              {label}
            </div>
          ))}
        </div>
        <BaseButtonWrapper type="submit" loading={isLoading}>
          ADD SKILL
        </BaseButtonWrapper>
      </form>
    </BaseModal>
  );
};
