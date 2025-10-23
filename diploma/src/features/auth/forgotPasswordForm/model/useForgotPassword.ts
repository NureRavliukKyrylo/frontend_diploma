import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  type ForgotPasswordDto,
} from "../api/forgotPasswordApi";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { useErrorStore } from "@shared/config";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { forgotPasswordSchema } from "../libs/forgotPasswordSchema";
import { useAuthStore } from "@entities/user";

export const useForgotPassword = () => {
  const router = useRouter();
  const { setServerError } = useErrorStore();
  const { emailForgotPassword, setEmailForgotPassword, setUserId } =
    useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordDto) => forgotPassword(data),
    onSuccess: (data) => {
      console.log("Forgot password success:", data);
      addToast({
        title: "Password reset email sent",
        description: "Please check your inbox for further instructions.",
        color: "success",
      });
      setServerError("forgotPasswordError", null);
      setUserId(data.userId);
      router.navigate({
        to: AuthRoutes.forgotPassword.verification,
      });
    },
    onError: (error: any) => {
      console.error("Forgot password error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      setServerError("forgotPasswordError", errorMessage);
      addToast({
        title: "Reset Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { email: emailForgotPassword },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      setEmailForgotPassword(values.email);
      console.log("Forgot password form submitted:", values);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
