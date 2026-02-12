import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  type ForgotPasswordDto,
} from "../api/forgotPasswordApi";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";

import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { forgotPasswordSchema } from "../libs/forgotPasswordSchema";
import { useAuthStore, useUserStore } from "@entities/user";
import { getErrorMessage } from "@shared/libs";

export const useForgotPassword = () => {
  const router = useRouter();

  const { emailForgotPassword, setEmailForgotPassword } = useAuthStore();
  const { setUserId } = useUserStore();

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordDto) => forgotPassword(data),
    onSuccess: (data) => {
      addToast({
        title: "Password reset email sent",
        description: "Please check your inbox for further instructions.",
        color: "success",
      });



      setUserId(data.userId);

      router.navigate({
        to: AuthRoutes.forgotPassword.verification,
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

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
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
