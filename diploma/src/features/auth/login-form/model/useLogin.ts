import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginDto } from "../api/loginApi";
import { loginSchema } from "../libs/loginSchema";
import { useErrorStore } from "@shared/config/stores";
import { useAuthStore, useUserStore } from "@entities/user";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs";

export const useLogin = () => {
  const { setServerError, clearError } = useErrorStore();
  const { loginEmail, loginPassword, rememberMe, clearLoginForm } =
    useAuthStore();
  const { setEmail } = useUserStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: (data) => {
      clearError("loginError");

      addToast({
        title: "Login Success",
        description: "You have logined successfully",
        color: "success",
      });

      clearLoginForm();

      if (data.requires2FA) {
        router.navigate({ to: AuthRoutes.twoFactor });
        return;
      }
      router.navigate({ to: "/home" });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      setServerError("loginError", errorMessage);

      addToast({
        title: "Login Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { email: loginEmail, password: loginPassword, rememberMe },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      setEmail(values.email);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
