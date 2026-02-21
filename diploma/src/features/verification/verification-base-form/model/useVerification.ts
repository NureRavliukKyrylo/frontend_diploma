import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useUserStore } from "@entities/user";
import { verifyCodeSchema } from "../libs/verifyCodeSchema";
import { getErrorMessage } from "@shared/libs";

interface VerificationConfig {
  apiFn: (data: any) => Promise<any>;
  successRedirect?: string;
  successMessage?: string;
  onSuccess?: () => void;
  extraFields?: Record<string, unknown>;
}

export const useVerification = ({
  apiFn,
  successRedirect,
  successMessage = "Code verified successfully",
  onSuccess,
  extraFields = {},
}: VerificationConfig) => {
  const router = useRouter();

  const { userId } = useUserStore();

  const mutation = useMutation({
    mutationFn: apiFn,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: successMessage,
        color: "success",
      });
      if (successRedirect) router.navigate({ to: successRedirect });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      addToast({
        title: "Verification Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      userId,
      ...extraFields,
    },

    validationSchema: verifyCodeSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
