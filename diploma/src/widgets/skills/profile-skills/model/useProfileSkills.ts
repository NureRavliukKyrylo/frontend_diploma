import { skillsQuery, type SkillsProfileSearchParams } from "@entities/skill";
import type { SortSkillsValues } from "@pages/skills";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useProfileSkills = (search: SkillsProfileSearchParams) => {
  const navigate = useNavigate({ from: "/profile/" });
  const { data, isLoading } = useQuery(skillsQuery.my(search));

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
    data,
    isLoading,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  };
};
