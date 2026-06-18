import { useFormik } from "formik";
import { getCategoriesSchema } from "../libs/categoriesSchema";
import { useOfferFormStore, type OfferFormData } from "@entities/offer";
import type { Category } from "@entities/category";
import { useTranslation } from "react-i18next";

interface UseCategoriesFormProps {
  data: OfferFormData;
}

export const useCategoriesForm = ({ data }: UseCategoriesFormProps) => {
  const setData = useOfferFormStore((s) => s.setData);
  const { t } = useTranslation(["timeBank"]);
  const formik = useFormik<{ categories: Category[] }>({
    initialValues: {
      categories: data.categories,
    },
    validationSchema: getCategoriesSchema(t),
    onSubmit: (values) => setData(values),
  });

  const toggleCategory = (category: Category) => {
    const current = formik.values.categories;
    const exists = current.some((c) => c.id === category.id);
    formik.setFieldValue(
      "categories",
      exists
        ? current.filter((c) => c.id !== category.id)
        : [...current, category],
    );
  };

  return { formik, toggleCategory };
};
