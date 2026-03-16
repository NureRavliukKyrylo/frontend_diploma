import { skillsQuery, type Skill } from "@entities/skill";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import type { SortSkillsValues } from "../config/sortingItems";

export const useSkillsPage = () => {
  const search = useSearch({ from: "/_masterLayout/skills/" });
  const navigate = useNavigate({ from: "/skills/" });
  const { data } = useQuery(skillsQuery.list(search));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

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

  const handleClearFilters = () => navigate({ search: {} });

  const handleToggleFilter = () => setFilterOpen((prev) => !prev);

  const handleAssignSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return {
    search,
    data,
    isModalOpen,
    selectedSkill,
    filterOpen,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    handleClearFilters,
    handleToggleFilter,
    handleAssignSkill,
    handleCloseModal,
  };
};
