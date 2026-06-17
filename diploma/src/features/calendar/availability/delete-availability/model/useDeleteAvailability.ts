import { useMutation } from "@tanstack/react-query";
import { deleteAvailability } from "../api/deleteAvailabilityApi";
import { addToast } from "@heroui/react";
import { queryClient } from "@shared/api";
import { calendarKeys } from "@entities/user/calendar";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

export const useDeleteAvailability = (onSuccess?: () => void) => {
  const { t } = useTranslation(["calendar", "common"]);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteAvailability(id),
    onSuccess: () => {
      addToast({
        title: t("calendar:deleteModal.removeSuccessTitle"),
        description: t("calendar:deleteModal.removeSuccessDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: calendarKeys.availabilitySlots(),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("calendar:deleteModal.removeFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    handleDelete: (id: string) => mutation.mutate(id),
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
