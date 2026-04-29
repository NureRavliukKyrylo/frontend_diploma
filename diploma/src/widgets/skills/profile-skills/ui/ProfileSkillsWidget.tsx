import { SearchBar } from "@shared/ui/inputs";
import styles from "./ProfileSkillsWidget.module.scss";
import { SortDropDown } from "@shared/ui/drop-down";
import { sortingSkillItems } from "@entities/skill";
import { Pagination } from "@shared/ui";
import { useProfileSkills } from "../model/useProfileSkills";
import type { PaginationResponse } from "@shared/config/types";
import type { SkillsProfileSearchParams } from "@entities/user";

interface ProfileSkillWidgetProps {
  skills: React.ReactNode;
  search: SkillsProfileSearchParams;
  pagination?: PaginationResponse;
}

export const ProfileSkillsWidget = ({
  skills,
  search,
  pagination,
}: ProfileSkillWidgetProps) => {
  const { handlePageChange, handleSearchChange, handleSortChange } =
    useProfileSkills();

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
            options={sortingSkillItems}
            onSelect={handleSortChange}
            value={search.OrderBy ?? "Default"}
          />
        </div>
      </div>
      {skills}
      {pagination && pagination.totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            total={pagination.totalPages}
            page={search.Page}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
