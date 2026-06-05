import { useFormik } from "formik";
import {
  categoriesSchema,
  type CategoriesFormValues,
} from "../libs/categoriesSchema";
import { useOfferFormStore, type OfferFormData } from "@entities/offer";

interface UseCategoriesFormProps {
  data: OfferFormData;
}

export const useCategoriesForm = ({ data }: UseCategoriesFormProps) => {
  const setData = useOfferFormStore((s) => s.setData);
  const formik = useFormik<CategoriesFormValues>({
    initialValues: {
      categoryIds: data.categoryIds,
    },
    validationSchema: categoriesSchema,
    onSubmit: (values) => setData(values),
  });

  const toggleCategory = (id: string) => {
    const current = formik.values.categoryIds;
    formik.setFieldValue(
      "categoryIds",
      current.includes(id) ? current.filter((v) => v !== id) : [...current, id],
    );
  };

  return { formik, toggleCategory };
};
