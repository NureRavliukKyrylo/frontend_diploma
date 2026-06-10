import * as Yup from "yup";

export const skillsSchema = Yup.object({
  skills: Yup.array()
    .of(Yup.object().required())
    .min(1, "Select at least one skill")
    .required(),
});

export type SkillsFormValues = Yup.InferType<typeof skillsSchema>;
