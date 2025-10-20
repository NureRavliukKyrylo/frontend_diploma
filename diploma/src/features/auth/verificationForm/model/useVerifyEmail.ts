import { useMutation } from "@tanstack/react-query";
import {
  verificationEmail,
  type VerificationEmailDto,
} from "../api/verificationFormApi";
import { useFormik } from "formik";
import { useAuthStore } from "@entities/user";
import { verifyEmailSchema } from "../libs/verifyEmailSchema";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useErrorStore } from "@shared/config";
import { MultiStepFormRoutes } from "@shared/routes";

export const useVerifyEmail = () => {
  const router = useRouter();
  const { setServerError } = useErrorStore();
  const { code, userId, clearVerifyForm } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: VerificationEmailDto) => verificationEmail(data),
    onSuccess: (data) => {
      console.log("success", data);
      addToast({
        title: "Code was verified successfully",
        description: "You have verified email successfully",
        color: "success",
      });
      clearVerifyForm();
      router.navigate({ to: MultiStepFormRoutes.fillForm });
    },
    onError: (error: any) => {
      console.log("error", error);
      const errorMessage =
        error?.response?.data?.error || "Something went wrong try again";
      setServerError(errorMessage);
      addToast({
        title: "Verification Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { code, userId },
    validationSchema: verifyEmailSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      console.log(values);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
