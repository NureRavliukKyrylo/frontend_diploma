import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { eventKeys } from "@entities/event";
import { getCalendarRange } from "@shared/libs/date";
import { getCheckOutValidationSchema } from "../libs/checkOutValidationSchema";
import { checkOut, type CheckOutDto } from "../api/checkOutApi";
import { useTranslation } from "react-i18next";

export interface CheckOutFormValues {
  note: string;
}

export const useCheckOut = (
  eventId: string,
  date: Date,
  onSuccess?: () => void,
) => {
  const { t } = useTranslation(["event"]);
  const { From, To } = getCalendarRange(date);

  const mutation = useMutation({
    mutationFn: (data: CheckOutDto) => checkOut(eventId, data),
    onSuccess: () => {
      addToast({
        title: t("event:checkOut.notifications.successTitle"),
        description: t("event:checkOut.notifications.successDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: eventKeys.attendance(eventId, { From, To }),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("event:checkOut.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<CheckOutFormValues>({
    initialValues: { note: "" },
    validationSchema: getCheckOutValidationSchema(t),
    onSubmit: () => {},
  });

  return {
    formik,
    handleCheckOut: (data: CheckOutDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
    mutation,
  };
};
