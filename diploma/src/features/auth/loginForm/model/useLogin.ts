import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginDto } from "../api/loginApi";
import { loginSchema } from "../libs/loginSchema";
import { useErrorStore } from "@shared/config";
import { useAuthStore } from "@entities/user";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";

export const useLogin = () => {
  const setServerError = useErrorStore((state) => state.setServerError);
  const { loginEmail, loginPassword, rememberMe, clearLoginForm } =
    useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: (data) => {
      setServerError("loginError", null);
      console.log("Login success:", data);
      addToast({
        title: "Login Success",
        description: "You have logined successfully",
        color: "success",
      });
      clearLoginForm();
      console.log(data.isTwoFactorEnabled);
      if (data.requires2FA) {
        router.navigate({ to: AuthRoutes.twoFactor });
        return;
      }
      router.navigate({ to: "/home" });
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong. Please try again";
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
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
