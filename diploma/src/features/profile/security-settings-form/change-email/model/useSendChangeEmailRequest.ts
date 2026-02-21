import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import {
  sendChangeEmailRequest,
  type SendChangeEmailRequestDto,
} from "../api/sendChangeEmailRequestApi";
import type { CodeType } from "@features/verification";
import { useFormik } from "formik";
import { changeEmailSchema } from "../lib/changeEmailSchema";

interface UseSendChangeEmailRequestProps {
  codeType?: CodeType;
  onSuccess?: () => void;
}

export const useSendChangeEmailRequest = ({
  codeType = "old-code",
  onSuccess,
}: UseSendChangeEmailRequestProps = {}) => {
  const mutation = useMutation({
    mutationFn: (data?: SendChangeEmailRequestDto) =>
      sendChangeEmailRequest(data, codeType),
    onSuccess: () => {
      addToast({
        title: "Change email request success",
        description: "You have sent changing email request successfully",
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Change email request failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik<SendChangeEmailRequestDto>({
    initialValues: {
      newEmail: "",
    },
    validationSchema: changeEmailSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return {
    formik,
    sendEmail: () => mutation.mutate(undefined),
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
