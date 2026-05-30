import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { eventKeys } from "@entities/event";
import { getCalendarRange } from "@shared/libs/date";
import { checkOutValidationSchema } from "../libs/checkOutValidationSchema";
import { checkOut, type CheckOutDto } from "../api/checkOutApi";

export interface CheckOutFormValues {
  note: string;
}

export const useCheckOut = (
  eventId: string,
  date: Date,
  onSuccess?: () => void,
) => {
  const { From, To } = getCalendarRange(date);

  const mutation = useMutation({
    mutationFn: (data: CheckOutDto) => checkOut(eventId, data),
    onSuccess: () => {
      addToast({
        title: "Event check-out Success",
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
        title: "Event check-out Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<CheckOutFormValues>({
    initialValues: { note: "" },
    validationSchema: checkOutValidationSchema,
    onSubmit: () => {},
  });

  return {
    formik,
    handleCheckOut: (data: CheckOutDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
    mutation,
  };
};
