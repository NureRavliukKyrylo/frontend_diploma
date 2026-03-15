import { BaseModal } from "@shared/ui/modals";
import { useAssignSkill } from "../../model/useAssignSkill";
import { type Skill } from "@entities/skill";
import { useState } from "react";
import { ASSIGN_SKILL_STEPS } from "../../config/steps";
import { AnimatePresence, motion } from "framer-motion";

interface AssignSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill;
}

export const AssingSkillModal = ({
  isOpen,
  onClose,
  skill,
}: AssignSkillModalProps) => {
  const { errorMessage, handleSubmit, mutation, formik, isLoading } =
    useAssignSkill(skill.id);
  const [stepIndex, setStepIndex] = useState(0);

  const handleClose = () => {
    setStepIndex(0);
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const CurrentStep = ASSIGN_SKILL_STEPS[stepIndex];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="900px"
      showClosed={stepIndex === 0}
    >
      <AnimatePresence mode="popLayout">
        <CurrentStep
          skill={skill}
          formik={formik}
          onNext={() => setStepIndex((prev) => prev + 1)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={errorMessage}
        />
      </AnimatePresence>
    </BaseModal>
  );
};
