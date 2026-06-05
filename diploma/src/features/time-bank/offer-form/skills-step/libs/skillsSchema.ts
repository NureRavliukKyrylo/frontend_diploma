import * as Yup from "yup";

export const skillsSchema = Yup.object({
  skillIds: Yup.array()
    .of(Yup.string().required())
    .min(1, "Select at least one skill")
    .required(),
});

export type SkillsFormValues = Yup.InferType<typeof skillsSchema>;
