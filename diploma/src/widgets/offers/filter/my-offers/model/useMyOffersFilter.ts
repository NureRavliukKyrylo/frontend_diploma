import type { OfferMySearchParams } from "@entities/offer";
import { toggleArrayParam } from "@shared/libs/search-params";
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

    onCategoryToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, id),
        Page: 1,
      })),

    onSkillToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        SkillIds: toggleArrayParam(prev.SkillIds, id),
        Page: 1,
      })),

    onIncludeArchivedChange: (value: boolean) =>
      nav((prev) => ({ ...prev, IncludeArchived: value, Page: 1 })),

    onClearFilters: () => navigate({ search: (prev) => ({ tab: prev.tab }) }),
  };
};
