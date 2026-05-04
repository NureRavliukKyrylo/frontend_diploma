import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import { type TaskSearchParams } from "@entities/task";
import type { BaseFiltersRoute } from "@shared/config/types";

export const useTaskFilters = (from: BaseFiltersRoute) => {
  const navigate = useNavigate({ from });

  const nav = (updater: (prev: TaskSearchParams) => TaskSearchParams) =>
    navigate({
      search: (prev) => updater(prev as TaskSearchParams),
      resetScroll: false,
    });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, From: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, To: date, Page: 1 })),

    onRatingChange: (rating: number | undefined) =>
      nav((prev) => ({ ...prev, Rating: rating, Page: 1 })),

    onProjectToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        ProjectIds: toggleArrayParam(prev.ProjectIds, id),
        Page: 1,
      })),

    onOrganizationToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        OrganizationIds: toggleArrayParam(prev.OrganizationIds, id),
        Page: 1,
      })),

    onSkillToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        SkillIds: toggleArrayParam(prev.SkillIds, id),
        Page: 1,
      })),

    onEventToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        EventIds: toggleArrayParam(prev.EventIds, id),
        Page: 1,
      })),

    onCategoryToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, id),
        Page: 1,
      })),

    onClearFilters: () => navigate({ search: (prev) => ({ tab: prev.tab }) }),
  };
};
