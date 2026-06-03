import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { eventKeys } from "@entities/event";
import { getCalendarRange } from "@shared/libs/date";
import { disputeAttendance } from "../api/disputeAttendanceApi";
import { disputeValidationSchema } from "../libs/disputeValidationsSchema";

export interface DisputeFormValues {
  comment: string;
}

export const useDisputeAttendance = (
  eventId: string,
  attendanceId: string,
  date: Date,
  onSuccess?: () => void,
) => {
  const { From, To } = getCalendarRange(date);

  const mutation = useMutation({
    mutationFn: (comment: string) =>
      disputeAttendance(eventId, attendanceId, comment),
    onSuccess: () => {
      addToast({
        title: "Dispute Submitted",
        description: "Your dispute has been submitted successfully",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: eventKeys.attendance(eventId, { From, To }),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Dispute Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<DisputeFormValues>({
    initialValues: { comment: "" },
    validationSchema: disputeValidationSchema,
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
