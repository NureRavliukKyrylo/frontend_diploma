import { useFormik } from "formik";
import { aboutFormSchema } from "../libs/aboutSchema";
import { useAuthStore } from "@entities/user";

export const useAboutForm = () => {
  const setBio = useAuthStore((state) => state.setBio);
  const setDateOfBirth = useAuthStore((state) => state.setDateOfBirth);
  const nextStep = useAuthStore((state) => state.nextStep);
  const profile = useAuthStore((state) => state.profile);

  const formik = useFormik({
    initialValues: {
      about: profile?.bio,
      dateOfBirth: profile?.dateOfBirth,
    },
    validationSchema: aboutFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setBio(values.about);
      setDateOfBirth(values.dateOfBirth);
      nextStep();
    },
  });

  return formik;
};
