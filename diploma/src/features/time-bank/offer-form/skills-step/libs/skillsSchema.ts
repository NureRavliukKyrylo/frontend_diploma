import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getSkillsSchema = (t: TFunction) =>
  Yup.object({
    skills: Yup.array()
      .of(Yup.object().required())
      .min(1, t("timeBank:validation.minOneSkill"))
      .required(),
  });

export type SkillsFormValues = Yup.InferType<
  ReturnType<typeof getSkillsSchema>
>;
