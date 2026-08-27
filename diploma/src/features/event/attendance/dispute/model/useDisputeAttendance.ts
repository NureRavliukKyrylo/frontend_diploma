import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { eventKeys } from "@entities/event";
import { getCalendarRange } from "@shared/libs/date";
import { disputeAttendance } from "../api/disputeAttendanceApi";
import { useTranslation } from "react-i18next";
import { getDisputeValidationSchema } from "../libs/disputeValidationsSchema";

export interface DisputeFormValues {
  comment: string;
}

export const useDisputeAttendance = (
  eventId: string,
  attendanceId: string,
  date: Date,
  onSuccess?: () => void,
) => {
  const { t } = useTranslation(["event"]);
  const { From, To } = getCalendarRange(date);

  const mutation = useMutation({
    mutationFn: (comment: string) =>
      disputeAttendance(eventId, attendanceId, comment),
    onSuccess: () => {
      addToast({
        title: t("event:dispute.notifications.successTitle"),
        description: t("event:dispute.notifications.successDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: eventKeys.attendance(eventId, { From, To }),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("event:dispute.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<DisputeFormValues>({
    initialValues: { comment: "" },
    validationSchema: getDisputeValidationSchema(t),
    onSubmit: (values) => {
      mutation.mutate(values.comment);
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    mutation,
  };
};
