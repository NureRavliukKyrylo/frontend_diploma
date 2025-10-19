import { useEffect } from "react";
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
      about: profile?.bio || "",
      dateOfBirth: profile?.dateOfBirth || "",
    },
    validationSchema: aboutFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("[DEBUG] Formik submit:", values);
      setBio(values.about);
      setDateOfBirth(values.dateOfBirth);
      console.log("test", profile?.dateOfBirth);
      nextStep();
    },
  });

  useEffect(() => {
    console.log("[DEBUG] Formik state:", formik.values);
  }, [formik.values]);

  return formik;
};
