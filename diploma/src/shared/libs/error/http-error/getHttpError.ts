import axios from "axios";

export interface HttpErrorInfo {
  status: number | null;
  message: string;
}

export const getHttpErrorInfo = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const serverMessage =
      error.response?.data?.message ?? error.response?.data?.title ?? null;

    return serverMessage ?? getStatusMessage(status);
  }
  return error instanceof Error ? error.message : "Unexpected error";
};

const STATUS_MESSAGES: Record<number, string> = {
  401: "You need to be logged in to view this content.",
  403: "You don't have permission to view this content.",
  404: "This resource could not be found.",
  429: "Too many requests. Please slow down.",
  500: "Server error. Please try again later.",
  503: "Service is temporarily unavailable.",
};

const getStatusMessage = (status: number | null): string =>
  (status !== null && STATUS_MESSAGES[status]) || "Something went wrong.";
