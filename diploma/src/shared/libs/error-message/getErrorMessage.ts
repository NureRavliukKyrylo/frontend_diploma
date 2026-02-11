import axios from "axios";

interface ApiErrorResponse {
  error?: string;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.error ?? "Something went wrong. Please try again"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again";
}
