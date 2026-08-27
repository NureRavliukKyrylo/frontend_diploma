import * as Yup from "yup";
import type { TFunction } from "i18next";

export const skillIconMaxSize = 2 * 1024 * 1024;

export const getSkillFormSchema = (t: TFunction) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(1)
      .max(120)
      .required(t("admin:skills.form.nameRequired")),
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
