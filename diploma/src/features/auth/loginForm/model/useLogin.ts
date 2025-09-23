import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginDto } from "../api/loginApi";
import { loginSchema } from "../libs/loginSchema";
import { useErrorStore } from "../../../../shared/stores";
import { useAuthFormStore } from "../../../../entities/user";

export const useLogin = () => {
  const setServerError = useErrorStore((state) => state.setServerError);

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: (data) => {
      setServerError(null);
      console.log("Login success:", data);
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Invalid login credentials. Please try again.";
      setServerError(errorMessage);
    },
  });

  const { loginEmail, password, rememberMe } = useAuthFormStore();

  const formik = useFormik({
    initialValues: { loginEmail, password, rememberMe },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
