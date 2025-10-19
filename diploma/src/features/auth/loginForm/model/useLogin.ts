import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginDto } from "../api/loginApi";
import { loginSchema } from "../libs/loginSchema";
import { useErrorStore } from "@shared/config";
import { useAuthStore } from "@entities/user";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";

export const useLogin = () => {
  const setServerError = useErrorStore((state) => state.setServerError);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: (data) => {
      setServerError(null);
      console.log("Login success:", data);
      router.navigate({ to: "/home" });
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Invalid login credentials. Please try again.";
      setServerError(errorMessage);
      addToast({
        title: "Login Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const { loginEmail, loginPassword, rememberMe } = useAuthStore();

  const formik = useFormik({
    initialValues: { email: loginEmail, password: loginPassword, rememberMe },
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
