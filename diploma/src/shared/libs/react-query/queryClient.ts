import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const defaultQueryOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: (failureCount: number, error: unknown) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) return false;
      return failureCount <= 1;
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});
