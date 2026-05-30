import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { checkIn, type CheckInDto } from "../api/checkInApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { eventKeys } from "@entities/event";
import { getCalendarRange } from "@shared/libs/date";
import { checkInValidationSchema } from "../libs/checkInValidationSchema";

export interface CheckInFormValues {
  note: string;
}

export const useCheckIn = (
  eventId: string,
  date: Date,
  onSuccess?: () => void,
) => {
  const { From, To } = getCalendarRange(date);

  const mutation = useMutation({
    mutationFn: (data: CheckInDto) => checkIn(eventId, data),
    onSuccess: () => {
      addToast({
        title: "Event check-in Success",
        description: "You have checked in successfully",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: eventKeys.attendance(eventId, { From, To }),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Event check-in Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<CheckInFormValues>({
    initialValues: { note: "" },
    validationSchema: checkInValidationSchema,
    onSubmit: () => {},
  });

  return {
    formik,
    handleCheckIn: (data: CheckInDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
    mutation,
  };
};
