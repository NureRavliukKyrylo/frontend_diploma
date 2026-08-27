import axios from "axios";
import type { TFunction } from "i18next";

export const getRoleErrorStatus = (error: unknown) =>
  axios.isAxiosError(error) ? error.response?.status : undefined;

export const getRoleSaveErrorMessage = (error: unknown, t: TFunction) => {
  if (!axios.isAxiosError(error)) return t("roles:form.errors.save");

  const responseData = error.response?.data;

  if (
    typeof responseData === "object" &&
    responseData !== null &&
    "error" in responseData &&
    typeof responseData.error === "string"
  ) {
    return responseData.error;
  }

  if (typeof responseData === "string" && responseData.trim()) {
    return responseData;
  }

  return error.response?.status
    ? t("roles:form.errors.serverRejected", {
        status: error.response.status,
      })
    : t("roles:form.errors.save");
};
