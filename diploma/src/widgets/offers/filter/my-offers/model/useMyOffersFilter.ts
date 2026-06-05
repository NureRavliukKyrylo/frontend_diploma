import type { OfferMySearchParams } from "@entities/offer";
import { useNavigate } from "@tanstack/react-router";

export const useMyOffersFilter = () => {
  const navigate = useNavigate({ from: "/time-bank/" });

  const nav = (updater: (prev: OfferMySearchParams) => OfferMySearchParams) =>
    navigate({
      search: (prev) => updater(prev as OfferMySearchParams),
      resetScroll: false,
    });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, From: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, To: date, Page: 1 })),

    onShowOnlineChange: (value?: boolean) =>
      nav((prev) => ({ ...prev, IsOnline: value, Page: 1 })),

    onIncludeArchivedChange: (value: boolean) =>
      nav((prev) => ({ ...prev, IncludeArchived: value, Page: 1 })),

    onClearFilters: () => navigate({ search: (prev) => ({ tab: prev.tab }) }),
  };
};
