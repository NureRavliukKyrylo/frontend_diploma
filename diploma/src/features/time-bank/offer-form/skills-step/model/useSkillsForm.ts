import { useOfferFormStore, type OfferFormData } from "@entities/offer";
import { useFormik } from "formik";
import { getSkillsSchema } from "../libs/skillsSchema";
import type { Skill } from "@entities/skill";
import { useTranslation } from "react-i18next";

interface UseCategoriesFormProps {
  data: OfferFormData;
}
export const useSkillsForm = ({ data }: UseCategoriesFormProps) => {
  const setData = useOfferFormStore((s) => s.setData);
  const { t } = useTranslation(["timeBank"]);

  const formik = useFormik<{ skills: Skill[] }>({
    initialValues: {
      skills: data.skills,
    },
    validationSchema: getSkillsSchema(t),
    onSubmit: (values) => setData(values),
  });

  const toggleSkill = (skill: Skill) => {
    const current = formik.values.skills;
    const exists = current.some((s) => s.id === skill.id);
    formik.setFieldValue(
      "skills",
      exists ? current.filter((s) => s.id !== skill.id) : [...current, skill],
    );
  };

  return { formik, toggleSkill };
};
