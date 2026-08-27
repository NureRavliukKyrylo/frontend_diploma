import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type { SkillsSearchParams } from "@entities/skill/libs";

export const useSkillsFilters = () => {
  const navigate = useNavigate({ from: "/skills/" });

  const nav = (updater: (prev: SkillsSearchParams) => SkillsSearchParams) =>
    navigate({ search: updater, resetScroll: false });

  return {
    onCategoryToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, id),
        Page: 1,
      })),

    onClearFilters: () => navigate({ search: {} }),
  };
};
