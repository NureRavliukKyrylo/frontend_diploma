import * as Yup from "yup";

export const categoryFormSchema = Yup.object({
  name: Yup.string().trim().min(2).max(100).required("Name is required"),
  description: Yup.string().trim().max(1000).nullable(),
  imageUrl: Yup.string().trim().url("Must be a valid URL").nullable(),
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
