import * as Yup from "yup";

export const skillIconMaxSize = 2 * 1024 * 1024;

export const skillFormSchema = Yup.object({
  name: Yup.string().trim().min(1).max(120).required("Name is required"),
  description: Yup.string().trim().max(1000).nullable(),
  categoryIds: Yup.array().of(Yup.string().required()).default([]),
  nameLocalizedUk: Yup.string().trim().max(120).nullable(),
  descriptionLocalizedUk: Yup.string().trim().max(1000).nullable(),
});

export interface SkillFormValues {
  name: string;
  description: string;
  categoryIds: string[];
  nameLocalizedUk: string;
  descriptionLocalizedUk: string;
}

export const getInitialSkillValues = (values?: Partial<SkillFormValues>) => ({
  name: values?.name ?? "",
  description: values?.description ?? "",
  categoryIds: values?.categoryIds ?? [],
  nameLocalizedUk: values?.nameLocalizedUk ?? "",
  descriptionLocalizedUk: values?.descriptionLocalizedUk ?? "",
});
