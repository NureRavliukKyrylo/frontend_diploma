import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useErrorStore } from "@shared/config";
import { useAuthStore } from "@entities/user";
import { verifyCodeSchema } from "../libs/verifyCodeSchema";

interface VerificationConfig {
  apiFn: (data: any) => Promise<any>;
  successRedirect?: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useVerification = ({
  apiFn,
  successRedirect,
  successMessage = "Code verified successfully",
  errorMessage = "Verification failed",
}: VerificationConfig) => {
  const router = useRouter();
  const { setServerError } = useErrorStore();
  const { userId } = useAuthStore();

  const mutation = useMutation({
    mutationFn: apiFn,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: successMessage,
        color: "success",
      });
      if (successRedirect) router.navigate({ to: successRedirect });
    },
    onError: (error: any) => {
      const errMsg = error?.response?.data?.error || errorMessage;
      setServerError("otpVerification", errMsg);
      addToast({
        title: "Verification Failed",
        description: errMsg,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      code: undefined,
      userId,
    },
    validationSchema: verifyCodeSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
