import { StepSkillInfo } from "../ui/step-skill-info/StepSkillInfo";
import { StepConfirmLevelInfo } from "../ui/step-set-level/StepConfirmLevelInfo";
import type { Skill } from "@entities/skill";
import type { SkillAssignDTO } from "../api/assignSkillApi";
import type { FormikProps } from "formik";

export interface StepProps {
  skill: Skill;
  formik: FormikProps<SkillAssignDTO>;
  onNext: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export const ASSIGN_SKILL_STEPS: React.FC<StepProps>[] = [
  StepSkillInfo,
  StepConfirmLevelInfo,
];
