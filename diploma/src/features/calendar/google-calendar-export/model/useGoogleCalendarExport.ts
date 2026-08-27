import { useMutation } from "@tanstack/react-query";
import { exportGoogleCalendar } from "../api/exportGoogleCalendarApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

export const useGoogleCalendarExport = () => {
  const { t } = useTranslation(["calendar", "common"]);

  const mutation = useMutation({
    mutationFn: exportGoogleCalendar,
    onSuccess: () => {
      addToast({
        title: t("calendar:export.successTitle"),
        description: t("calendar:export.successDescription"),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("calendar:export.failedTitle"),
        description: getErrorMessage(error, t),
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
