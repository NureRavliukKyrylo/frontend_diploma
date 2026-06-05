import { useOfferFormStore, type OfferFormData } from "@entities/offer";
import { useFormik } from "formik";
import { skillsSchema, type SkillsFormValues } from "../libs/skillsSchema";

interface UseCategoriesFormProps {
  data: OfferFormData;
}

export const useSkillsForm = ({ data }: UseCategoriesFormProps) => {
  const setData = useOfferFormStore((s) => s.setData);

  const formik = useFormik<SkillsFormValues>({
    initialValues: {
      skillIds: data.skillIds,
    },
    validationSchema: skillsSchema,
    onSubmit: (values) => setData(values),
  });

  const toggleSkill = (id: string) => {
    const current = formik.values.skillIds;
    formik.setFieldValue(
      "skillIds",
      current.includes(id) ? current.filter((v) => v !== id) : [...current, id],
    );
  };

  return { formik, toggleSkill };
};
