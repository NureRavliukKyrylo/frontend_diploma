import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useUserStore } from "@entities/user";
import { getVerifyCodeSchema } from "../libs/verifyCodeSchema";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

interface VerificationConfig<TData, TResult> {
  apiFn: (data: TData) => Promise<TResult>;
  confirmFn?: () => Promise<unknown>;
  successRedirect?: string;
  successMessage?: string;
  onSuccess?: (data: TResult) => void;
  extraFields?: Record<string, unknown>;
  includeUserId?: boolean;
  requireUserId?: boolean;
}

export const useVerification = <TData, TResult>({
  apiFn,
  successRedirect,
  successMessage,
  onSuccess,
  extraFields = {},
  includeUserId = true,
  requireUserId = false,
  confirmFn,
}: VerificationConfig<TData, TResult>) => {
  const { t } = useTranslation(["auth", "common"]);
  const router = useRouter();
  const { userId: storeUserId } = useUserStore();
  const validationSchema = getVerifyCodeSchema(t);
  const userId = storeUserId?.trim() || undefined;

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const result = await apiFn(data);
      if (confirmFn) await confirmFn();
      return result;
    },
    onSuccess: (data) => {
      addToast({
        title: t("verification.successTitle"),
        description: successMessage ?? t("verification.successMessage"),
        color: "success",
      });
      onSuccess?.(data);
      if (successRedirect) router.navigate({ to: successRedirect });
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
    initialValues: {
      code: "",
      ...(includeUserId ? { userId } : {}),
      ...extraFields,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, helpers) => {
      const payload = { ...values } as Record<string, unknown>;

      if (includeUserId) {
        payload.userId =
          typeof payload.userId === "string" && payload.userId.trim()
            ? payload.userId.trim()
            : useUserStore.getState().userId?.trim();
      }

      if (requireUserId && !payload.userId) {
        const message = t("common:errors.unauthorized");
        helpers.setFieldError("code", message);
        addToast({
          title: t("verification.failedTitle"),
          description: message,
          color: "danger",
        });
        return;
      }

      mutation.mutate(payload as TData);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
