import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginDto } from "../api/loginApi";
import { loginSchema } from "../libs/loginSchema";

import { useAuthStore, useUserStore } from "@entities/user";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs";

export const useLogin = () => {

  const { loginEmail, loginPassword, rememberMe, clearLoginForm } =
    useAuthStore();
  const { setEmail } = useUserStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: (data) => {

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
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
