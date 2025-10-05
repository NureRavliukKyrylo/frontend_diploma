import { useFormik } from "formik";
import { useAuthStore } from "../../../../entities/user";
import { registerSchema } from "../libs/signUpSchema";
import { useRouter } from "@tanstack/react-router";

export const useRegistration = () => {
  const router = useRouter();
  const { signUpEmail, firstName, lastName, agreement } = useAuthStore();

  const formik = useFormik({
    initialValues: { signUpEmail, firstName, lastName, agreement },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      localStorage.setItem("authFormData", JSON.stringify(values));
      router.navigate({ to: "/auth/verification" });
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: false,
    error: null,
  };
};
