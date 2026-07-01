import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getCategoryFormSchema = (t: TFunction) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(2)
      .max(100)
      .required(t("admin:categories.form.nameRequired")),
    description: Yup.string().trim().max(1000).nullable(),
    imageUrl: Yup.string()
      .trim()
      .url(t("admin:categories.form.invalidUrl"))
      .nullable(),
    nameLocalizedUk: Yup.string().trim().max(100).nullable(),
    descriptionLocalizedUk: Yup.string().trim().max(1000).nullable(),
  });

export interface CategoryFormValues {
  name: string;
  description: string;
  imageUrl: string;
  nameLocalizedUk: string;
  descriptionLocalizedUk: string;
}

export const getInitialCategoryValues = (
  values?: Partial<CategoryFormValues>,
) => ({
  name: values?.name ?? "",
  description: values?.description ?? "",
  imageUrl: values?.imageUrl ?? "",
  nameLocalizedUk: values?.nameLocalizedUk ?? "",
  descriptionLocalizedUk: values?.descriptionLocalizedUk ?? "",
});
