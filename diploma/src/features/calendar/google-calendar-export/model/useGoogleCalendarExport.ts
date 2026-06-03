import { useMutation } from "@tanstack/react-query";
import { exportGoogleCalendar } from "../api/exportGoogleCalendarApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";

export const useGoogleCalendarExport = () => {
  const mutation = useMutation({
    mutationFn: exportGoogleCalendar,
    onSuccess: () => {
      addToast({
        title: "Exported successfully",
        description: "Your activities have been exported to Google Calendar.",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Export failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    exportToGoogleCalendar: (from: Date, to: Date) =>
      mutation.mutate({
        from: from.toISOString(),
        to: to.toISOString(),
      }),
    isLoading: mutation.isPending,
  };
};
