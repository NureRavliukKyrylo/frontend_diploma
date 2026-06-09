import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { sendGift, type SendGiftDto } from "../api/sendGiftApi";
import { sendGiftSchema } from "../libs/sendGiftSchema";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";

interface UseGiftMinutesProps {
  recipientUserId: string;
  onSuccess: () => void;
}

export const useSendGiftMinutes = ({
  recipientUserId,
  onSuccess,
}: UseGiftMinutesProps) => {
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
        title: "Gift sent",
        description: "Minutes have been gifted successfully",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to send gift",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      amountMinutes: "",
      message: "",
    },
    validationSchema: sendGiftSchema,
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
