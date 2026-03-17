import { SearchBar } from "@shared/ui/inputs";
import styles from "./ProfileSkillsWidget.module.scss";
import { SortDropDown } from "@shared/ui/drop-down";
import { sortingItems } from "@pages/skills/skills-page/config/sortingItems";
import { Pagination, Skeleton } from "@heroui/react";
import { type SkillsProfileSearchParams } from "@entities/skill";
import { useProfileSkills } from "../model/useProfileSkills";

interface ProfileSkillWidgetProps {
  skills: React.ReactNode;
  search: SkillsProfileSearchParams;
}

export const ProfileSkillsWidget = ({
  skills,
  search,
}: ProfileSkillWidgetProps) => {
  const {
    data,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    isLoading,
  } = useProfileSkills(search);

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
        <h1 className={styles.totalSkills}>
          {isLoading ? (
            <Skeleton className={styles.skeletonText} />
          ) : (
            <>Skills ({data?.pagination.totalCount})</>
          )}
        </h1>
        {skills}
      </div>
      {data && data?.pagination.totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            total={data.pagination.totalPages}
            page={search.Page}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
