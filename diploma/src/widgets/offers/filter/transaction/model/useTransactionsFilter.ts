import { useNavigate } from "@tanstack/react-router";
import type { TransactionsSearchParams } from "@entities/offer";

export const useTransactionsFilter = () => {
  const navigate = useNavigate({ from: "/time-bank/" });

  const nav = (
    updater: (prev: TransactionsSearchParams) => TransactionsSearchParams,
  ) =>
    navigate({
      search: (prev) => updater(prev as TransactionsSearchParams),
      resetScroll: false,
    });

  const onTypeChange = (value: string) => {
    nav((prev) => ({
      ...prev,
      Type:
        value === "all"
          ? undefined
          : (value as TransactionsSearchParams["Type"]),
      Page: 1,
    }));
  };

  const onSourceTypeChange = (value: string) => {
    nav((prev) => ({
      ...prev,
      SourceType:
        value === "all"
          ? undefined
          : (value as TransactionsSearchParams["SourceType"]),
      Page: 1,
    }));
  };

  const onStartDateChange = (date: string | undefined) => {
    nav((prev) => ({ ...prev, From: date, Page: 1 }));
  };

  const onEndDateChange = (date: string | undefined) => {
    nav((prev) => ({ ...prev, To: date, Page: 1 }));
  };

  const onClearFilters = () =>
    navigate({ search: (prev) => ({ tab: prev.tab }) });

  return {
    onTypeChange,
    onSourceTypeChange,
    onStartDateChange,
    onEndDateChange,
    onClearFilters,
  };
};
