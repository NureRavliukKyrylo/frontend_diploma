import { useOfferFormStore, type OfferFormData } from "@entities/offer";
import { useFormik } from "formik";
import { skillsSchema } from "../libs/skillsSchema";
import type { Skill } from "@entities/skill";

interface UseCategoriesFormProps {
  data: OfferFormData;
}
export const useSkillsForm = ({ data }: UseCategoriesFormProps) => {
  const setData = useOfferFormStore((s) => s.setData);

  const formik = useFormik<{ skills: Skill[] }>({
    initialValues: {
      skills: data.skills,
    },
    validationSchema: skillsSchema,
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
