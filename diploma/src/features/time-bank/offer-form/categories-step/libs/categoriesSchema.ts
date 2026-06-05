import * as Yup from "yup";

export const categoriesSchema = Yup.object({
  categoryIds: Yup.array()
    .of(Yup.string().required())
    .min(1, "Select at least one category")
    .required(),
});

export type CategoriesFormValues = Yup.InferType<typeof categoriesSchema>;
