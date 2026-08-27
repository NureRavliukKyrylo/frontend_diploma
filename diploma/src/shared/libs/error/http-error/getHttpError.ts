import axios from "axios";
import { type TFunction } from "i18next";

export const getHttpErrorInfo = (error: unknown, t: TFunction): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const serverMessage =
      error.response?.data?.message ?? error.response?.data?.title ?? null;

    return serverMessage ?? getStatusMessage(status, t);
  }

  return error instanceof Error ? error.message : t("common:errors.unexpected");
};

const STATUS_MESSAGES_KEYS: Record<number, string> = {
  401: "common:errors.unauthorized",
  403: "common:errors.forbidden",
  404: "common:errors.notFound",
  429: "common:errors.tooManyRequests",
  500: "common:errors.internalServer",
  503: "common:errors.serviceUnavailable",
};

const getStatusMessage = (status: number | null, t: TFunction): string => {
  if (status !== null && STATUS_MESSAGES_KEYS[status]) {
    return t(STATUS_MESSAGES_KEYS[status]);
  }
  return t("common:errors.somethingWentWrong");
};
