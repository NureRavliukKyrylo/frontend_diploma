import { SearchBar } from "@shared/ui/inputs";
import styles from "./ProfileSkillsWidget.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { SortSkillsValues } from "@pages/skills";
import { SortDropDown } from "@shared/ui/drop-down";
import { sortingItems } from "@pages/skills/skills-page/config/sortingItems";
import { Pagination } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { skillsQuery, type SkillsProfileSearchParams } from "@entities/skill";

interface ProfileSkillWidgetProps {
  skills: React.ReactNode;
  search: SkillsProfileSearchParams;
}

export const ProfileSkillsWidget = ({
  skills,
  search,
}: ProfileSkillWidgetProps) => {
  const navigate = useNavigate({ from: "/profile/" });
  const { data } = useQuery(skillsQuery.my(search));

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

  return (
    <div className={styles.skillsProfileWrapper}>
      <div className={styles.skillsProfileControl}>
        <h1 className={styles.skillProfileTitle}>SKILLS</h1>
        <div className={styles.filtersProfileSkill}>
          <SearchBar
            value={search.Search}
            variant="projects"
            onChange={handleSearchChange}
          />
          <SortDropDown
            options={sortingItems}
            onSelect={handleSortChange}
            value={search.OrderBy ?? "Default"}
          />
        </div>
      </div>
      <div className={styles.skillsProfileList}>
        <h1 className={styles.totalSkills}>Skills</h1>
        {skills}
      </div>
    </div>
  );
};
