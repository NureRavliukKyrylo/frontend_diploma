import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { sendGift, type SendGiftDto } from "../api/sendGiftApi";
import { getSendGiftSchema } from "../libs/sendGiftSchema";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseGiftMinutesProps {
  recipientUserId: string;
  onSuccess: () => void;
}

export const useSendGiftMinutes = ({
  recipientUserId,
  onSuccess,
}: UseGiftMinutesProps) => {
  const { t } = useTranslation(["timeBank", "common"]);
  const idempotencyKey = useRef(uuidv4());

  const mutation = useMutation({
    mutationFn: (data: SendGiftDto) =>
      sendGift({
        ...data,
        recipientUserId,
        idempotencyKey: idempotencyKey.current,
      }),
    onSuccess: () => {
      idempotencyKey.current = uuidv4();
      addToast({
        title: t("timeBank:gifts.toasts.successTitle"),
        description: t("timeBank:gifts.toasts.successDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:gifts.actions.actionName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      amountMinutes: "",
      message: "",
    },
    validationSchema: getSendGiftSchema(t),
    onSubmit: (values) => {
      mutation.mutate({
        ...values,
        amountMinutes: Number(values.amountMinutes),
        idempotencyKey: idempotencyKey.current,
        recipientUserId,
      });
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
  };
};
