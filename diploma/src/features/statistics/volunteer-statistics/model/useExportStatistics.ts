import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { exportStatistics } from "../api/exportStatisticsApi";
import { useTranslation } from "react-i18next";

export const useExportStatistics = () => {
  const { t } = useTranslation("profile");

  return useMutation({
    mutationFn: exportStatistics,
    onSuccess: () => {
      addToast({
        title: t("statistics.export.successTitle"),
        description: t("statistics.export.successDescription"),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("statistics.export.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });
};
