import { useSearch } from "@tanstack/react-router";
import styles from "./TasksTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { useTasksTab } from "../model/useTasksTab";
import { MyTasksFilterWidget } from "@widgets/tasks";
import { sortingTaskItems } from "@entities/task";
import type { MyTasksSearchParams } from "@entities/project";

export const TasksTab = () => {
  const search = useSearch({ from: "/_masterLayout/projects/my/" });

  const { setIsFilterOpen, handleSearch, handleSort, handlePageChange, tasks } =
    useTasksTab(search as MyTasksSearchParams);

  if (search.tab !== "tasks") return null;

  return (
    <>
      <div className={styles.mainMyTasksSection}>
        <div className={styles.filtersBlock}>
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <MyTasksFilterWidget search={search} />
          </ToggleDropdownButton>
          <SearchBar
            value={search.Search}
            onChange={handleSearch}
            variant="projects"
          />
          <SortDropDown
            options={sortingTaskItems}
            onSelect={handleSort}
            value={search.OrderBy ?? "Default"}
          />
        </div>

        {tasks && tasks.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={tasks.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};
