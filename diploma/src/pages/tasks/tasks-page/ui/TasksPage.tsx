import { Pagination } from "@shared/ui";
import styles from "./TasksPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { useTasksPage } from "../model/useTasksPage";
import { sortingTaskItems, taskQuery } from "@entities/task";
import { TaskFiltersWidget } from "@widgets/tasks";

export function TasksPage() {
  const {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useTasksPage();

  const { data: tasks } = useQuery(taskQuery.list(search));

  return (
    <div className={styles.tasksWrapper}>
      <div className={styles.mainTasksSection}>
        <div className={styles.filterTasksWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <TaskFiltersWidget search={search} />
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
    </div>
  );
}
