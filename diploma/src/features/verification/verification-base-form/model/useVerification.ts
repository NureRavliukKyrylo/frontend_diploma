import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useUserStore } from "@entities/user";
import { getVerifyCodeSchema } from "../libs/verifyCodeSchema";
import { getErrorMessage } from "@shared/libs/error-message";
import { profileQuery } from "@entities/user/profile";
import { useTranslation } from "react-i18next";

interface VerificationConfig<TData, TResult> {
  apiFn: (data: TData) => Promise<TResult>;
  confirmFn?: () => Promise<unknown>;
  successRedirect?: string;
  successMessage?: string;
  onSuccess?: () => void;
  extraFields?: Record<string, unknown>;
}

export const useVerification = <TData, TResult>({
  apiFn,
  successRedirect,
  successMessage,
  onSuccess,
  extraFields = {},
  confirmFn,
}: VerificationConfig<TData, TResult>) => {
  const { t } = useTranslation(["auth", "common"]);
  const router = useRouter();
  const { userId: storeUserId } = useUserStore();
  const validationSchema = getVerifyCodeSchema(t);

  const { data: user } = useQuery({
    ...profileQuery.all(),
    enabled: !storeUserId,
  });

  const userId = storeUserId ?? user?.id;

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const result = await apiFn(data);
      if (confirmFn) await confirmFn();
      return result;
    },
    onSuccess: () => {
      addToast({
        title: t("verification.successTitle"),
        description: successMessage ?? t("verification.successMessage"),
        color: "success",
      });
      if (successRedirect) router.navigate({ to: successRedirect });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("verification.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { code: "", userId, ...extraFields },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
