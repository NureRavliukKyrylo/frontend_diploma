import * as Yup from "yup";

export const categoriesSchema = Yup.object({
  categories: Yup.array()
    .of(Yup.object().required())
    .min(1, "Select at least one category")
    .required(),
});

export type CategoriesFormValues = Yup.InferType<typeof categoriesSchema>;
