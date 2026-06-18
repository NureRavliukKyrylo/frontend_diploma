import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { checkIn, type CheckInDto } from "../api/checkInApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { eventKeys } from "@entities/event";
import { getCalendarRange } from "@shared/libs/date";
import { getCheckInValidationSchema } from "../libs/checkInValidationSchema";
import { useTranslation } from "react-i18next";

export interface CheckInFormValues {
  note: string;
}

export const useCheckIn = (
  eventId: string,
  date: Date,
  onSuccess?: () => void,
) => {
  const { t } = useTranslation(["event"]);
  const { From, To } = getCalendarRange(date);

  const mutation = useMutation({
    mutationFn: (data: CheckInDto) => checkIn(eventId, data),
    onSuccess: () => {
      addToast({
        title: t("event:checkIn.notifications.successTitle"),
        description: t("event:checkIn.notifications.successDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: eventKeys.attendance(eventId, { From, To }),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("event:checkIn.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<CheckInFormValues>({
    initialValues: { note: "" },
    validationSchema: getCheckInValidationSchema(t),
    onSubmit: () => {},
  });

  return {
    formik,
    handleCheckIn: (data: CheckInDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
    mutation,
  };
};
