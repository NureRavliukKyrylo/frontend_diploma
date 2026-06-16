import { useFormik } from "formik";
import { getAboutFormSchema } from "../libs/aboutSchema";
import { useAuthStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const useAboutForm = () => {
  const setBio = useAuthStore((state) => state.setBio);
  const setDateOfBirth = useAuthStore((state) => state.setDateOfBirth);
  const nextStep = useAuthStore((state) => state.nextStep);
  const profile = useAuthStore((state) => state.profile);
  const { t } = useTranslation(["common", "auth"]);
  const validationSchema = getAboutFormSchema(t);

  const formik = useFormik({
    initialValues: {
      about: profile?.bio,
      dateOfBirth: profile?.dateOfBirth,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setBio(values.about);
      setDateOfBirth(values.dateOfBirth);
      nextStep();
    },
  });

  return formik;
};
