import axios from "axios";
import type { TFunction } from "i18next";

interface ApiErrorResponse {
  error?: string;
}

export function getErrorMessage(error: unknown, t?: TFunction): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.error ??
      t?.("common:errors.somethingWentWrong") ??
      "Something went wrong"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return t?.("common:errors.somethingWentWrong") ?? "Something went wrong";
}
