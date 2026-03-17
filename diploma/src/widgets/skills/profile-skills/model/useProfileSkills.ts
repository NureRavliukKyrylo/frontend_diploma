import type { SortSkillsValues } from "@pages/skills";
import { useNavigate } from "@tanstack/react-router";

export const useProfileSkills = () => {
  const navigate = useNavigate({ from: "/profile/" });

  const handlePageChange = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, Page: page }) });

  const handleSearchChange = (value: string) =>
    navigate({
      search: (prev) => ({ ...prev, Search: value || undefined, Page: 1 }),
      resetScroll: false,
    });

  const handleSortChange = (value: SortSkillsValues) =>
    navigate({
      search: (prev) => ({ ...prev, OrderBy: value, Page: 1 }),
      resetScroll: false,
    });

  return {
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  };
};
