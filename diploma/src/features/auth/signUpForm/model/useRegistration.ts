import { useFormik } from "formik";
import { useAuthFormStore } from "../../../../entities/user";
import { registerSchema } from "../libs/signUpSchema";
import { useRouter } from "@tanstack/react-router";

export const useRegistration = () => {
  const router = useRouter();
  const { registerEmail, firstName, lastName, role, agreement } =
    useAuthFormStore();

  const formik = useFormik({
    initialValues: { registerEmail, firstName, lastName, role, agreement },
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
