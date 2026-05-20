import { useMutation } from "@tanstack/react-query";
import { deleteAvailability } from "../api/deleteAvailabilityApi";
import { addToast } from "@heroui/react";
import { queryClient } from "@shared/api";
import { calendarKeys } from "@entities/user/calendar";
import { getErrorMessage } from "@shared/libs/error-message";

export const useDeleteAvailability = (onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: (id: string) => deleteAvailability(id),
    onSuccess: () => {
      addToast({
        title: "Availability removed",
        description: "Time-Availability has been successfully removed",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: calendarKeys.availabilitySlots(),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });
  return {
    handleDelete: (id: string) => mutation.mutate(id),
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
