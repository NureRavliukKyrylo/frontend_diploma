import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getCategoriesSchema = (t: TFunction) =>
  Yup.object({
    categories: Yup.array()
      .of(Yup.object().required())
      .min(1, t("timeBank:validation.minOneCategory"))
      .required(),
  });

export type CategoriesFormValues = Yup.InferType<
  ReturnType<typeof getCategoriesSchema>
>;
