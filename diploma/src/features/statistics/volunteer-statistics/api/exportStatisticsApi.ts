import { apiClient } from "@shared/api";

export const exportStatistics = async (): Promise<void> => {
  const response = await apiClient.get("statistics/me/export", {
    responseType: "blob",
  });

  const url = URL.createObjectURL(
    new Blob([response.data], { type: "application/pdf" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "statistics.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
