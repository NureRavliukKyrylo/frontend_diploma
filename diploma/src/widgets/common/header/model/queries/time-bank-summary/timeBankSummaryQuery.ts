import { queryOptions } from "@tanstack/react-query";
import { getTimeBankSummary } from "../../../api/time-bank-summary/getTimeBankSummaryApi";

export const timeBankSummaryKeys = {
  all: () => ["header", "time-bank"] as const,
  me: () => [...timeBankSummaryKeys.all(), "me", "summary"] as const,
};

export const timeBankSummaryQuery = {
  me: () =>
    queryOptions({
      queryKey: timeBankSummaryKeys.me(),
      queryFn: getTimeBankSummary,
      staleTime: 60_000,
    }),
};
